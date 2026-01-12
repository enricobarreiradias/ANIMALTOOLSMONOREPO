import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm'; 

import { DentalEvaluation } from '@app/data/entities/dental-evaluation.entity';
import { ToothEvaluation } from '@app/data/entities/tooth-evaluation.entity';
import { Animal } from '@app/data/entities/animal.entity';
import { User } from '@app/data/entities/user.entity';
import { Media } from '@app/data/entities/media.entity'; 
// ATUALIZADO: Adicionados ColorScale e ToothType
import { PhotoType, SeverityScale, ToothCode, ColorScale, ToothType } from '@app/data/enums/dental-evaluation.enums'; 

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(DentalEvaluation)
    private readonly evaluationRepository: Repository<DentalEvaluation>,

    @InjectRepository(ToothEvaluation)
    private readonly toothRepository: Repository<ToothEvaluation>,
    
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>, 
    
    private dataSource: DataSource,
  ) {}

  // --- 1. CRIAR AVALIAÇÃO ---
  async create(createDto: any): Promise<DentalEvaluation> {
    const animalIdNumber = Number(createDto.animalId);

    const animal = await this.animalRepository.findOne({ 
        where: { id: animalIdNumber } 
    });
    
    if (!animal) throw new NotFoundException(`Animal não encontrado.`);

    let evaluator = await this.userRepository.findOne({ 
        where: { id: createDto.evaluatorId } 
    });
    
    if (!evaluator) {
      evaluator = await this.userRepository.findOne({ order: { registrationDate: 'ASC' } });
    }

    if (!evaluator) throw new NotFoundException(`Nenhum avaliador encontrado.`);

    const evaluation = this.evaluationRepository.create({
      animal: animal, 
      evaluator: evaluator,
      generalObservations: createDto.notes || '',
      evaluationDate: new Date()
    });
    
    const savedEvaluation = await this.evaluationRepository.save(evaluation);

    if (createDto.teeth && Array.isArray(createDto.teeth)) {
        for (const toothData of createDto.teeth) {
          const tooth = this.toothRepository.create({
              evaluation: savedEvaluation,
              toothCode: toothData.toothCode,
              
              // NOVO: Tipo de dente (Leite/Permanente)
              toothType: toothData.toothType || ToothType.PERMANENT,

              isPresent: toothData.isPresent !== false,
              
              // ATUALIZADO: Removido sufixo 'Mm' e trocado por Level (0-2)
              crownReductionLevel: toothData.crownReductionLevel || SeverityScale.NONE,
              lingualWear: toothData.lingualWear || SeverityScale.NONE,
              
              // ATUALIZADO: Removido sufixo 'Mm' e trocado por Level (0-2)
              gingivalRecessionLevel: toothData.gingivalRecessionLevel || SeverityScale.NONE,
              
              periodontalLesions: toothData.periodontalLesions || SeverityScale.NONE, 
              
              fractureLevel: toothData.fractureLevel || SeverityScale.NONE,
              pulpitis: toothData.pulpitis || SeverityScale.NONE,
              
              vitrifiedBorder: toothData.vitrifiedBorder || SeverityScale.NONE, 
              pulpChamberExposure: toothData.pulpChamberExposure || SeverityScale.NONE, 
              gingivitisEdema: toothData.gingivitisEdema || SeverityScale.NONE, 
              
              // ATUALIZADO: Usando ColorScale (0 ou 1)
              gingivitisColor: toothData.gingivitisColor || ColorScale.NORMAL, 

              dentalCalculus: toothData.dentalCalculus || SeverityScale.NONE,
              
              // ATUALIZADO: Usando ColorScale (0 ou 1)
              abnormalColor: toothData.abnormalColor || ColorScale.NORMAL,
              
              caries: toothData.caries || SeverityScale.NONE,
          });
          await this.toothRepository.save(tooth);
        }
    } else {
        await this.createDefaultHealthyTeeth(savedEvaluation);
    }
    
    return this.findOne(savedEvaluation.id);
  }

  // --- 2. LISTAR PENDENTES ---
  async findPendingEvaluations() {
    const animals = await this.animalRepository.find({
       relations: ['dentalEvaluations', 'mediaFiles'], 
       order: { id: 'DESC' },
       take: 50
    });
    
    return animals
      .filter(a => a.dentalEvaluations.length === 0) 
      .map(a => ({
        id: a.id.toString(), 
        code: a.tagCode,     
        breed: a.breed,
        farm: a.farm,
        client: a.client,
        entryDate: a.collectionDate ? new Date(a.collectionDate).toLocaleDateString('pt-BR') : new Date(a.registrationDate).toLocaleDateString('pt-BR'),
        media: a.mediaFiles?.map(m => m.s3UrlPath) || []
      }));
  }

  // --- 3. HISTÓRICO GERAL ---
  async findAllHistory(page: number = 1, limit: number = 10) {
    const [evaluations, total] = await this.evaluationRepository.findAndCount({
        relations: ['animal', 'mediaFiles', 'teeth'],
        order: { id: 'DESC' },
        skip: (page - 1) * limit,
        take: limit
    });

    return {
      data: evaluations.map(ev => {
        const maxFracture = ev.teeth?.length 
            ? Math.max(...ev.teeth.map(t => t.fractureLevel)) 
            : 0;

        // ATUALIZADO: Regra de Crítico inclui Recessão Gengival (Dr. Iveraldo)
        // Lembrando: SeverityScale.SEVERE agora é valor 2 (escala 0-2)
        const isCritical = ev.teeth?.some(t => 
            t.fractureLevel >= SeverityScale.SEVERE || 
            t.pulpitis >= SeverityScale.SEVERE ||
            t.gingivalRecessionLevel >= SeverityScale.SEVERE // Nova Regra
        );

        return {
            id: ev.id.toString(),
            animalId: ev.animal.id.toString(),
            code: ev.animal.tagCode,
            breed: ev.animal.breed,
            lastEvaluationDate: ev.evaluationDate,
            media: ev.mediaFiles?.map(m => m.s3UrlPath) || [],
            worstFracture: maxFracture,
            isCritical: isCritical
        };
      }),
      meta: { total, page, limit }
    };
  }

  // --- 4. BUSCAR UMA ÚNICA AVALIAÇÃO ---
  async findOne(id: number) {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
      relations: ['animal', 'evaluator', 'mediaFiles', 'teeth'], 
    });

    if (!evaluation) {
      throw new NotFoundException(`Avaliação #${id} não encontrada.`);
    }
    return evaluation;
  }

  // --- 5. ATUALIZAR ---
  async update(id: number, updateDto: any) {
    const evaluation = await this.findOne(id);

    if (updateDto.notes !== undefined) {
        evaluation.generalObservations = updateDto.notes;
    }

    await this.evaluationRepository.save(evaluation);

    if (updateDto.teeth && Array.isArray(updateDto.teeth)) {
        for (const t of updateDto.teeth) {
            const tooth = await this.toothRepository.findOne({
                where: { evaluation: { id: id }, toothCode: t.toothCode }
            });

            if (tooth) {
                // ATUALIZAÇÃO: Mapeando novos campos e nomes corrigidos
                if (t.toothType !== undefined) tooth.toothType = t.toothType;
                if (t.fractureLevel !== undefined) tooth.fractureLevel = t.fractureLevel;
                if (t.lingualWear !== undefined) tooth.lingualWear = t.lingualWear;
                
                // MUDANÇA: _mm para _level
                if (t.crownReductionLevel !== undefined) tooth.crownReductionLevel = t.crownReductionLevel;
                if (t.gingivalRecessionLevel !== undefined) tooth.gingivalRecessionLevel = t.gingivalRecessionLevel;
                
                if (t.pulpitis !== undefined) tooth.pulpitis = t.pulpitis;
                if (t.dentalCalculus !== undefined) tooth.dentalCalculus = t.dentalCalculus;
                if (t.caries !== undefined) tooth.caries = t.caries;
                
                // MUDANÇA: Cores
                if (t.abnormalColor !== undefined) tooth.abnormalColor = t.abnormalColor;
                if (t.gingivitisColor !== undefined) tooth.gingivitisColor = t.gingivitisColor;
                
                await this.toothRepository.save(tooth);
            }
        }
    }

    return this.findOne(id);
  }

  // --- 6. REMOVER ---
  async remove(id: number) {
    const evaluation = await this.findOne(id);
    return await this.evaluationRepository.remove(evaluation);
  }

  // --- 7. HISTÓRICO POR ANIMAL ---
  async findHistoryByAnimal(animalIdOrTag: string) {
    const isId = !isNaN(Number(animalIdOrTag));
    
    const query = this.evaluationRepository.createQueryBuilder('evaluation')
      .leftJoinAndSelect('evaluation.animal', 'animal')
      .leftJoinAndSelect('evaluation.mediaFiles', 'media')
      .leftJoinAndSelect('evaluation.evaluator', 'evaluator')
      .leftJoinAndSelect('evaluation.teeth', 'teeth');

    if (isId) {
      query.where('animal.id = :id', { id: animalIdOrTag });
    } else {
      query.where('animal.tagCode = :tag', { tag: animalIdOrTag });
    }

    return await query.orderBy('evaluation.evaluationDate', 'DESC').getMany();
  }

  // --- 8. DASHBOARD STATS ---
  async getDashboardStats() {
    const totalAnimals = await this.animalRepository.count();
    const totalEvaluations = await this.evaluationRepository.count();
    const pendingList = await this.findPendingEvaluations();
    
    // ATUALIZADO: KPI Crítico também conta Recessão Gengival
    const criticalQuery = this.evaluationRepository.createQueryBuilder('eval')
            .innerJoin('eval.teeth', 'tooth')
            .where('tooth.fracture_level >= :level', { level: SeverityScale.SEVERE })
            .orWhere('tooth.pulpitis >= :level', { level: SeverityScale.SEVERE })
            .orWhere('tooth.gingival_recession_level >= :level', { level: SeverityScale.SEVERE }); 
        
    const criticalCases = await criticalQuery.getCount();

    return {
      totalAnimals,
      totalEvaluations,
      pendingEvaluations: pendingList.length,
      criticalCases,
    };
  }

 // --- 9. UPLOAD ANIMAL + FOTOS  ---
  async createAnimalFromUpload(
    code: string, 
    breed: string, 
    mediaPaths: string[],
    details?: { farm?: string; client?: string; location?: string; collectionDate?: Date; age?: number }
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const animalPayload: DeepPartial<Animal> = {
        tagCode: code,
        breed: breed,
        farm: details?.farm,        
        client: details?.client,
        location: details?.location,
        collectionDate: details?.collectionDate || new Date(),
        age: details?.age || 24,
      };

      const newAnimal = this.animalRepository.create(animalPayload);
      const savedAnimal = await queryRunner.manager.save(newAnimal);

      for (const [index, path] of mediaPaths.entries()) {
        const mediaPayload: DeepPartial<Media> = {
          s3UrlPath: path,
          photoType: index === 0 ? PhotoType.FRONTAL : PhotoType.LATERAL_LEFT, 
          animal: savedAnimal
        };
        const newMedia = this.mediaRepository.create(mediaPayload);
        await queryRunner.manager.save(newMedia);
      }

      await queryRunner.commitTransaction();
      return savedAnimal;

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // --- 10. SEED ---
  async seed() {

    await this.createAnimalFromUpload(
      'BR-2026-A',
      'Nelore',
      ['https://placehold.co/600x400/000000/FFFFFF/png?text=Frontal'],
      {
        farm: 'Fazenda Santa Fé',
        client: 'Rodrigo Penso',
        location: 'Goiás - GO',
        collectionDate: new Date('2026-01-12'),
        age: 36
      }
    );

    return await this.createAnimalFromUpload(
      'BR-2026-B',
      'Angus',
      ['https://placehold.co/600x400/550000/FFFFFF/png?text=Frontal'],
      {
        farm: 'Fazenda Ouro Verde',
        client: 'Fabiano Araújo',
        location: 'Nova Crixás - GO',
        collectionDate: new Date('2026-01-14'),
        age: 18
      }
    );
  }

  // --- HELPER PRIVADO ---
  private async createDefaultHealthyTeeth(evaluation: DentalEvaluation) {
      const teethCodes = Object.values(ToothCode);
      const teethEntities = teethCodes.map(code => this.toothRepository.create({
          evaluation,
          toothCode: code,
          toothType: ToothType.PERMANENT, // Default para Permanente
          fractureLevel: SeverityScale.NONE,
          isPresent: true
      }));
      await this.toothRepository.save(teethEntities);
  }
}