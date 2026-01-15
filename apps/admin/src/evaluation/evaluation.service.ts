import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm'; 

import { DentalEvaluation } from '@app/data/entities/dental-evaluation.entity';
import { ToothEvaluation } from '@app/data/entities/tooth-evaluation.entity';
import { Animal } from '@app/data/entities/animal.entity';
import { User } from '@app/data/entities/user.entity';
import { Media } from '@app/data/entities/media.entity'; 
import { PhotoType, SeverityScale, ToothCode, ColorScale, ToothType } from '@app/data/enums/dental-evaluation.enums'; 
import { MoultingStage } from '@app/data/enums/dental-evaluation.enums'; // Importe o Enum
import { QuickMoultingDto } from './dto/quick-moulting.dto'; // Importe o DTO

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
    if (!animal) throw new NotFoundException(`Animal #${animalIdNumber} não encontrado.`);

    const evaluatorId = createDto.evaluatorId || 1; 
    const evaluator = await this.userRepository.findOne({ where: { id: evaluatorId } });
    
    if (!evaluator) {
        throw new NotFoundException(`Avaliador (User ID: ${evaluatorId}) não encontrado no sistema.`);
    }

    let evaluation = await this.evaluationRepository.findOne({
        where: { animal: { id: animal.id } },
        relations: ['teeth'],
        order: { evaluationDate: 'DESC' }
    });
    
    const isSameDay = evaluation && new Date().toDateString() === new Date(evaluation.evaluationDate).toDateString();

    if (evaluation && isSameDay) {
        evaluation.generalObservations = createDto.notes || evaluation.generalObservations;
        evaluation.evaluationDate = new Date(); // Atualiza hora
    } else {
        evaluation = this.evaluationRepository.create({
            animal: animal, 
            evaluator: evaluator,
            generalObservations: createDto.notes || '',
            evaluationDate: new Date()
        });
    }
    
    const savedEvaluation = await this.evaluationRepository.save(evaluation);

    if (createDto.teeth && Array.isArray(createDto.teeth)) {
        for (const toothData of createDto.teeth) {
          let tooth = await this.toothRepository.findOne({
              where: { evaluation: { id: savedEvaluation.id }, toothCode: toothData.toothCode }
          });

          if (!tooth) {
             tooth = this.toothRepository.create({
                 evaluation: savedEvaluation,
                 toothCode: toothData.toothCode,
             });
          }

          tooth.toothType = toothData.toothType || ToothType.PERMANENT;
          tooth.isPresent = toothData.isPresent !== false;
          tooth.crownReductionLevel = toothData.crownReductionLevel || SeverityScale.NONE;
          tooth.lingualWear = toothData.lingualWear || SeverityScale.NONE;
          tooth.gingivalRecessionLevel = toothData.gingivalRecessionLevel || SeverityScale.NONE;
          tooth.periodontalLesions = toothData.periodontalLesions || SeverityScale.NONE;
          tooth.fractureLevel = toothData.fractureLevel || SeverityScale.NONE;
          tooth.pulpitis = toothData.pulpitis || SeverityScale.NONE;
          tooth.vitrifiedBorder = toothData.vitrifiedBorder || SeverityScale.NONE;
          tooth.pulpChamberExposure = toothData.pulpChamberExposure || SeverityScale.NONE;
          tooth.gingivitisEdema = toothData.gingivitisEdema || SeverityScale.NONE;
          tooth.gingivitisColor = toothData.gingivitisColor || ColorScale.NORMAL;
          tooth.dentalCalculus = toothData.dentalCalculus || SeverityScale.NONE;
          tooth.abnormalColor = toothData.abnormalColor || ColorScale.NORMAL;
          tooth.caries = toothData.caries || SeverityScale.NONE;

          await this.toothRepository.save(tooth);
        }
    } else if (!isSameDay) {
        await this.createDefaultHealthyTeeth(savedEvaluation);
    }
    
    return this.findOne(savedEvaluation.id);
  }
  // --- APLICAÇÃO DE MUDA RÁPIDA ---
  async applyQuickMoulting(dto: QuickMoultingDto) {
      const stage = dto.stage;
      
      const permanentRules = {
        I1: [MoultingStage.D2, MoultingStage.D4, MoultingStage.D6, MoultingStage.BC].includes(stage),
        I2: [MoultingStage.D4, MoultingStage.D6, MoultingStage.BC].includes(stage),
        I3: [MoultingStage.D6, MoultingStage.BC].includes(stage),
        I4: [MoultingStage.BC].includes(stage),
      };

      const teethToSave = Object.values(ToothCode).map(code => {
        const prefix = code.split('_')[0]; 
        const isPermanent = permanentRules[prefix] || false;

        return {
          toothCode: code,
          isPresent: true,
          toothType: isPermanent ? ToothType.PERMANENT : ToothType.DECIDUOUS,
          fractureLevel: SeverityScale.NONE,
          pulpitis: SeverityScale.NONE,
          gingivalRecessionLevel: SeverityScale.NONE,
          crownReductionLevel: SeverityScale.NONE,
          lingualWear: SeverityScale.NONE,
          periodontalLesions: SeverityScale.NONE,
          dentalCalculus: SeverityScale.NONE,
          caries: SeverityScale.NONE,
          vitrifiedBorder: SeverityScale.NONE,
          pulpChamberExposure: SeverityScale.NONE,
          gingivitisEdema: SeverityScale.NONE,
          gingivitisColor: ColorScale.NORMAL,
          abnormalColor: ColorScale.NORMAL,
        };
      });

      return this.create({
        animalId: dto.animalId,
        evaluatorId: dto.evaluatorId,
        notes: `Muda Rápida aplicada: ${stage}`, 
        teeth: teethToSave
      });
  }

  // --- 2. PENDENTES COM FILTROS E PAGINAÇÃO ---
  async findPendingEvaluations(
      page: number = 1, 
      limit: number = 20, 
      search?: string, 
      filterFarm?: string
  ) {
      const query = this.animalRepository.createQueryBuilder('animal')
        .leftJoinAndSelect('animal.mediaFiles', 'media')
        .leftJoin('animal.dentalEvaluations', 'evaluation')
        .where('evaluation.id IS NULL'); 

      if (search) {
          query.andWhere('(animal.tagCode ILIKE :search OR animal.id::text ILIKE :search)', { search: `%${search}%` });
      }
      if (filterFarm) {
          query.andWhere('animal.farm ILIKE :farm', { farm: `%${filterFarm}%` });
      }

      const [animals, total] = await query
        .orderBy('animal.id', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      
      return {
          data: animals.map(a => ({
            id: a.id.toString(), 
            code: a.tagCode,     
            breed: a.breed,
            farm: a.farm,
            client: a.client,
            entryDate: a.collectionDate ? new Date(a.collectionDate).toLocaleDateString('pt-BR') : 'N/A',
            media: a.mediaFiles?.map(m => m.s3UrlPath) || []
          })),
          meta: { total, page, limit, lastPage: Math.ceil(total / limit) }
      };
  }

// --- 3. HISTÓRICO  ---
  async findAllHistory(
      page: number = 1, 
      limit: number = 10, 
      search?: string,       
      filterFarm?: string,   
      filterClient?: string  
  ) {
    const query = this.evaluationRepository.createQueryBuilder('evaluation')
        .leftJoinAndSelect('evaluation.animal', 'animal')
        .leftJoinAndSelect('evaluation.mediaFiles', 'mediaFiles')
        .leftJoinAndSelect('evaluation.teeth', 'teeth');

   
    if (search) {
        query.andWhere('(animal.tagCode ILIKE :search OR animal.id::text ILIKE :search)', { search: `%${search}%` });
    }
    if (filterFarm) {
        query.andWhere('animal.farm ILIKE :farm', { farm: `%${filterFarm}%` });
    }
    if (filterClient) {
        query.andWhere('animal.client ILIKE :client', { client: `%${filterClient}%` });
    }

    const [evaluations, total] = await query
        .orderBy('evaluation.id', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

    return {
      data: evaluations.map(ev => {
        const maxFracture = ev.teeth?.length 
            ? Math.max(...ev.teeth.map(t => t.fractureLevel)) 
            : 0;

        const isCritical = ev.teeth?.some(t => 
            t.fractureLevel >= SeverityScale.SEVERE || 
            t.pulpitis >= SeverityScale.SEVERE ||
            t.gingivalRecessionLevel >= SeverityScale.SEVERE
        );

        return {
            id: ev.id.toString(),
            animalId: ev.animal.id.toString(),
            code: ev.animal.tagCode,
            breed: ev.animal.breed,
            farm: ev.animal.farm,
            client: ev.animal.client,
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const evaluation = await queryRunner.manager.findOne(DentalEvaluation, { where: { id } });
      if (!evaluation) throw new NotFoundException(`Avaliação #${id} não encontrada.`);

      if (updateDto.notes !== undefined) {
          evaluation.generalObservations = updateDto.notes;
          await queryRunner.manager.save(evaluation);
      }

      if (updateDto.teeth && Array.isArray(updateDto.teeth)) {
          for (const t of updateDto.teeth) {
              let tooth = await queryRunner.manager.findOne(ToothEvaluation, {
                  where: { evaluation: { id: id }, toothCode: t.toothCode }
              });

              if (!tooth) {
                  tooth = queryRunner.manager.create(ToothEvaluation, {
                      evaluation: evaluation,
                      toothCode: t.toothCode
                  });
              }

              Object.assign(tooth, {
                  toothType: t.toothType ?? tooth.toothType,
                  isPresent: t.isPresent ?? tooth.isPresent,

                  fractureLevel: t.fractureLevel ?? tooth.fractureLevel,
                  pulpitis: t.pulpitis ?? tooth.pulpitis,
                  gingivalRecessionLevel: t.gingivalRecessionLevel ?? tooth.gingivalRecessionLevel,
                  crownReductionLevel: t.crownReductionLevel ?? tooth.crownReductionLevel,

                  lingualWear: t.lingualWear ?? tooth.lingualWear,
                  periodontalLesions: t.periodontalLesions ?? tooth.periodontalLesions,
                  dentalCalculus: t.dentalCalculus ?? tooth.dentalCalculus,
                  caries: t.caries ?? tooth.caries,

                  vitrifiedBorder: t.vitrifiedBorder ?? tooth.vitrifiedBorder,
                  pulpChamberExposure: t.pulpChamberExposure ?? tooth.pulpChamberExposure,
                  gingivitisEdema: t.gingivitisEdema ?? tooth.gingivitisEdema,

                  gingivitisColor: t.gingivitisColor ?? tooth.gingivitisColor,
                  abnormalColor: t.abnormalColor ?? tooth.abnormalColor,
              });

              await queryRunner.manager.save(tooth);
          }
      }

      await queryRunner.commitTransaction();

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
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
    
    const pendingResult = await this.findPendingEvaluations(1, 1);
    
    const criticalQuery = this.evaluationRepository.createQueryBuilder('eval')
            .innerJoin('eval.teeth', 'tooth')
            .where('tooth.fracture_level >= :level', { level: SeverityScale.SEVERE })
            .orWhere('tooth.pulpitis >= :level', { level: SeverityScale.SEVERE })
            .orWhere('tooth.gingival_recession_level >= :level', { level: SeverityScale.SEVERE }); 
        
    const criticalCases = await criticalQuery.getCount();

    return {
      totalAnimals,
      totalEvaluations,
      pendingEvaluations: pendingResult.meta.total, 
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

    const randomId = Math.floor(Math.random() * 99999);
    const breeds = ['Nelore', 'Angus', 'Brahman', 'Senepol', 'Holandês'];
    const farms = ['Fazenda Santa Fé', 'Fazenda Ouro Verde', 'Rancho do Vale'];
    
    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
    const randomFarm = farms[Math.floor(Math.random() * farms.length)];

    await this.createAnimalFromUpload(
      `BR-SEED-${randomId}`, 
      randomBreed,
      ['https://placehold.co/600x400/222/fff/png?text=Foto+Animal'],
      {
        farm: randomFarm,
        client: 'Cliente Teste',
        location: 'Seed Location',
        collectionDate: new Date(),
        age: 24 + Math.floor(Math.random() * 24)
      }
    );

    return { message: `✅ Animal BR-SEED-${randomId} criado com sucesso! Atualize a página para criar mais.` };
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