import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm'; 
import { QuickMoultingDto, MoultingStage } from './dto/quick-moulting.dto';
import { DentalEvaluation } from '@app/data/entities/dental-evaluation.entity';
import { ToothEvaluation } from '@app/data/entities/tooth-evaluation.entity';
import { Animal } from '@app/data/entities/animal.entity';
import { User } from '@app/data/entities/user.entity';
import { Media } from '@app/data/entities/media.entity'; 
import { PhotoType, SeverityScale, ToothCode, ColorScale, ToothType } from '@app/data/enums/dental-evaluation.enums'; 
// REMOVIDO: import { MoultingStage } ...
// REMOVIDO: import { QuickMoultingDto } ...

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

  async applyQuickMoulting(dto: QuickMoultingDto) {
    // 1. Cria a estrutura base de dentes
    const allTeethCodes = [
      'I1_LEFT', 'I1_RIGHT', 
      'I2_LEFT', 'I2_RIGHT', 
      'I3_LEFT', 'I3_RIGHT', 
      'I4_LEFT', 'I4_RIGHT'
    ];

    const teethData = allTeethCodes.map(code => {
      // Regra de Negócio que estava no Front
      const isPermanent = this.checkIsPermanent(code, dto.stage);
      
      return {
        toothCode: code,
        isPresent: true,
        toothType: isPermanent ? 'PERMANENT' : 'DECIDUOUS', // Use o Enum correto do seu projeto
        // Define tudo como saudável (Severity 0)
        fractureLevel: 0,
        pulpitis: 0,
        crownReductionLevel: 0,
        gingivalRecessionLevel: 0,
        lingualWear: 0,
        periodontalLesions: 0,
        caries: 0,
        abnormalColor: 0,
        gingivitisColor: 0
      };
    });

    // 2. Salva ou Atualiza a Avaliação
    // Aqui reutilizamos o método 'create' que já tens, ou adaptamos para atualizar
    return this.create({
      animalId: dto.animalId,
      evaluatorId: dto.evaluatorId || 1, // Fallback
      notes: `Muda rápida aplicada: ${dto.stage}`,
      teeth: teethData
    });
  }

  // Função auxiliar privada (Regra Veterinária)
  private checkIsPermanent(code: string, stage: MoultingStage): boolean {
    const prefix = code.split('_')[0]; 

    switch (prefix) {
      case 'I1': 
        return [MoultingStage.D2, MoultingStage.D4, MoultingStage.D6, MoultingStage.BC].includes(stage);
      case 'I2': 
        return [MoultingStage.D4, MoultingStage.D6, MoultingStage.BC].includes(stage);
      case 'I3': 
        return [MoultingStage.D6, MoultingStage.BC].includes(stage);
      case 'I4': 
        return [MoultingStage.BC].includes(stage);
      default: 
        return false;
    }
  }

  // --- 2. PENDENTES COM FILTROS E PAGINAÇÃO ---
  async findPendingEvaluations(
      page: number = 1, 
      limit: number = 20, 
      search?: string, 
      filterFarm?: string,
      filterClient?: string
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
      if (filterClient) {
          query.andWhere('animal.client ILIKE :client', { client: `%${filterClient}%` });
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
            age: a.age, 
            chip: a.chip,
            sisbov: a.sisbovNumber, 
            currentWeight: a.currentWeight,
            lot: a.lot,
            birthDate: a.birthDate ? new Date(a.birthDate).toLocaleDateString('pt-BR') : undefined,
            entryDate: a.collectionDate ? new Date(a.collectionDate).toLocaleDateString('pt-BR') : 'N/A',
            media: a.mediaFiles?.map(m => m.s3UrlPath) || []
          })),
          meta: { total, page, limit, lastPage: Math.ceil(total / limit) }
      };
  }

  // --- HELPER PRIVADO: A LÓGICA CENTRAL DE CLASSIFICAÇÃO ---
  private calculateStatus(teeth: ToothEvaluation[]): 'CRITICAL' | 'MODERATE' | 'HEALTHY' {
      if (!teeth || teeth.length === 0) return 'HEALTHY';

      // 1. VERIFICAÇÃO DE CRÍTICO (Prioridade Máxima)
      // Regra Dr. Iveraldo: Fratura Severa OU Pulpite Severa OU Recessão Severa
      const hasCritical = teeth.some(t => 
          t.fractureLevel === SeverityScale.SEVERE || 
          t.pulpitis === SeverityScale.SEVERE ||
          t.gingivalRecessionLevel === SeverityScale.SEVERE
      );

      if (hasCritical) return 'CRITICAL';

      // 2. VERIFICAÇÃO DE MODERADO
      // Se tiver qualquer patologia em nível moderado (1) ou severo (nos campos não críticos)
      const hasModerate = teeth.some(t => 
          t.fractureLevel === SeverityScale.MODERATE ||
          t.pulpitis === SeverityScale.MODERATE ||
          t.gingivalRecessionLevel === SeverityScale.MODERATE ||
          
          // Outras patologias que contam para moderado se existirem
          t.crownReductionLevel >= SeverityScale.MODERATE ||
          t.periodontalLesions >= SeverityScale.MODERATE ||
          t.dentalCalculus >= SeverityScale.MODERATE ||
          t.lingualWear >= SeverityScale.MODERATE ||
          t.caries >= SeverityScale.MODERATE
      );

      if (hasModerate) return 'MODERATE';

      // 3. SE NÃO TEM NADA DISSO, É SAUDÁVEL
      return 'HEALTHY';
  }

  // --- 3. HISTÓRICO ATUALIZADO ---
  async findAllHistory(
      page: number = 1, 
      limit: number = 10, 
      search?: string,       
      filterFarm?: string,   
      filterClient?: string,
      filterPathology?: string 
  ) {
    const query = this.evaluationRepository.createQueryBuilder('evaluation')
        .leftJoinAndSelect('evaluation.animal', 'animal')
        .leftJoinAndSelect('evaluation.mediaFiles', 'mediaFiles')
        .innerJoinAndSelect('evaluation.teeth', 'teeth'); 

    if (search) {
        query.andWhere('(animal.tagCode ILIKE :search OR animal.id::text ILIKE :search)', { search: `%${search}%` });
    }
    if (filterFarm && filterFarm !== 'all') {
        query.andWhere('animal.farm ILIKE :farm', { farm: `%${filterFarm}%` });
    }
    if (filterClient && filterClient !== 'all') {
        query.andWhere('animal.client ILIKE :client', { client: `%${filterClient}%` });
    }

    // --- FILTRO EXPANDIDO PARA TODAS AS PATOLOGIAS ---
    if (filterPathology) {
        const map: Record<string, string> = {
            'fracture': 'teeth.fracture_level',
            'pulpitis': 'teeth.pulpitis',
            'recession': 'teeth.gingival_recession_level',
            'crown': 'teeth.crown_reduction_level',
            'calculus': 'teeth.dental_calculus',
            'periodontal': 'teeth.periodontal_lesions',
            'lingual': 'teeth.lingual_wear',
            'caries': 'teeth.caries',
            'vitrified': 'teeth.vitrified_border',
            'exposure': 'teeth.pulp_chamber_exposure',
            'edema': 'teeth.gingivitis_edema',
        };

        const column = map[filterPathology];
        if (column) {
            query.andWhere(`${column} > 0`);
        }
    }

    const [evaluations, total] = await query
        .orderBy('evaluation.evaluationDate', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

    return {
      data: evaluations.map(ev => {
        const maxFracture = ev.teeth?.length ? Math.max(...ev.teeth.map(t => t.fractureLevel)) : 0;
        const status = this.calculateStatus(ev.teeth);

        return {
            id: ev.id.toString(),
            animalId: ev.animal.id.toString(),
            code: ev.animal.tagCode,
            breed: ev.animal.breed,
            farm: ev.animal.farm,
            client: ev.animal.client,
            chip: ev.animal.chip,
            age: ev.animal.age, 
            lastEvaluationDate: ev.evaluationDate,
            media: ev.mediaFiles?.map(m => m.s3UrlPath) || [],
            worstFracture: maxFracture,
            status: status 
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
              // VERIFICAÇÃO CRÍTICA: Busca pelo código do dente DENTRO desta avaliação
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

  // --- 8. DASHBOARD STATS (CORRIGIDO) ---
  async getDashboardStats() {
    // 1. Total de Animais
    const totalAnimals = await this.animalRepository.count();

    // 2. Total de Avaliações (Laudos emitidos)
    const totalEvaluations = await this.evaluationRepository.count();
    
    // 3. Pendentes
    // CORREÇÃO AQUI: Mudamos de 'animal.evaluations' para 'animal.dentalEvaluations'
    const pendingEvaluations = await this.animalRepository.createQueryBuilder('animal')
        .leftJoin('animal.dentalEvaluations', 'evaluation') 
        .where('evaluation.id IS NULL')
        .getCount();
    
    // 4. Casos Críticos
    const criticalStats = await this.evaluationRepository.createQueryBuilder('eval')
        .innerJoin('eval.teeth', 'tooth')
        .where('tooth.fracture_level >= :level', { level: SeverityScale.SEVERE })
        .orWhere('tooth.pulpitis >= :level', { level: SeverityScale.SEVERE })
        .orWhere('tooth.gingival_recession_level >= :level', { level: SeverityScale.SEVERE })
        .select('COUNT(DISTINCT eval.id)', 'count')
        .getRawOne();
        
    return {
      totalAnimals,
      totalEvaluations,
      pendingEvaluations, 
      criticalCases: parseInt(criticalStats?.count || '0', 10),
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
          toothType: ToothType.DECIDUOUS, 
          fractureLevel: SeverityScale.NONE,
          isPresent: true
      }));
      await this.toothRepository.save(teethEntities);
  }

  // --- 11. RELATÓRIOS AVANÇADOS (COM FILTRO DE DATA) ---
  async getReportStats(
      filterFarm?: string,
      filterClient?: string,
      startDate?: string,
      endDate?: string
  ) {
    // 1. Cria a Query Base (Apenas Joins e Filtros)
    const baseQuery = this.evaluationRepository.createQueryBuilder('evaluation')
        .leftJoin('evaluation.animal', 'animal')
        .leftJoin('evaluation.teeth', 'tooth');

    // --- FILTROS DE TEXTO ---
    if (filterFarm && filterFarm !== 'all') {
        baseQuery.andWhere('animal.farm ILIKE :farm', { farm: `%${filterFarm}%` });
    }
    if (filterClient && filterClient !== 'all') {
        baseQuery.andWhere('animal.client ILIKE :client', { client: `%${filterClient}%` });
    }

    // --- FILTRO DE DATA (NOVO) ---
    if (startDate && endDate) {
        // Ajuste para garantir que apanha o dia inteiro (00:00:00 até 23:59:59)
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        baseQuery.andWhere('evaluation.evaluationDate BETWEEN :start AND :end', { 
            start, 
            end 
        });
    }

    // 2. Query para CLASSIFICAÇÃO (Geral) - Clone 1
    const classificationQuery = baseQuery.clone();
    
    const evaluationsData = await classificationQuery
        .select([
            'evaluation.id',
            'MAX(tooth.fracture_level) as max_fracture',
            'MAX(tooth.pulpitis) as max_pulpitis',
            'MAX(tooth.gingival_recession_level) as max_recession',
            'MAX(tooth.crown_reduction_level) as max_crown',
            'MAX(tooth.dental_calculus) as max_calculus',
            'MAX(tooth.periodontal_lesions) as max_periodontal',
            'MAX(tooth.lingual_wear) as max_lingual',
            'MAX(tooth.caries) as max_caries',
            'MAX(tooth.vitrified_border) as max_vitrified',
            'MAX(tooth.pulp_chamber_exposure) as max_exposure',
            'MAX(tooth.gingivitis_edema) as max_edema'
        ])
        .groupBy('evaluation.id')
        .getRawMany();

    let healthy = 0;
    let moderate = 0;
    let critical = 0;

    evaluationsData.forEach(ev => {
        const fracture = Number(ev.max_fracture || 0);
        const pulpitis = Number(ev.max_pulpitis || 0);
        const recession = Number(ev.max_recession || 0);
        
        // Severidade 2 Nestes = CRÍTICO (Regra Dr. Iveraldo)
        if (fracture === 2 || pulpitis === 2 || recession === 2) {
            critical++;
        } else {
            // Verificar se há algum Moderado (Severidade >= 1) nos outros
            const values = [
                fracture, pulpitis, recession,
                Number(ev.max_crown || 0), Number(ev.max_calculus || 0),
                Number(ev.max_periodontal || 0), Number(ev.max_lingual || 0),
                Number(ev.max_caries || 0), Number(ev.max_vitrified || 0),
                Number(ev.max_exposure || 0), Number(ev.max_edema || 0)
            ];
            
            if (values.some(v => v >= 1)) {
                moderate++;
            } else {
                healthy++;
            }
        }
    });

    const total = evaluationsData.length;

    // 3. Query para ESTATÍSTICAS DE PATOLOGIA - Clone 2
    const statsQuery = baseQuery.clone();
    
    const stats = await statsQuery
        .select([
            'COUNT(DISTINCT CASE WHEN tooth.fracture_level > 0 THEN evaluation.id END) as fractures',
            'COUNT(DISTINCT CASE WHEN tooth.pulpitis > 0 THEN evaluation.id END) as pulpitis',
            'COUNT(DISTINCT CASE WHEN tooth.gingival_recession_level > 0 THEN evaluation.id END) as recession',
            'COUNT(DISTINCT CASE WHEN tooth.crown_reduction_level > 0 THEN evaluation.id END) as crown_reduction',
            'COUNT(DISTINCT CASE WHEN tooth.dental_calculus > 0 THEN evaluation.id END) as calculus',
            'COUNT(DISTINCT CASE WHEN tooth.periodontal_lesions > 0 THEN evaluation.id END) as periodontal',
            'COUNT(DISTINCT CASE WHEN tooth.lingual_wear > 0 THEN evaluation.id END) as lingual_wear',
            'COUNT(DISTINCT CASE WHEN tooth.caries > 0 THEN evaluation.id END) as caries',
            'COUNT(DISTINCT CASE WHEN tooth.vitrified_border > 0 THEN evaluation.id END) as vitrified_border',
            'COUNT(DISTINCT CASE WHEN tooth.pulp_chamber_exposure > 0 THEN evaluation.id END) as pulp_exposure',
            'COUNT(DISTINCT CASE WHEN tooth.gingivitis_edema > 0 THEN evaluation.id END) as gingivitis_edema',
        ])
        .getRawOne();

    const safeStats = stats || {}; 

    const totalLesions = 
        Object.values(safeStats).reduce((acc: number, val) => acc + Number(val || 0), 0) as number;

    return {
        general: {
            total,
            healthy,
            moderate,
            critical,
            totalLesions,
            healthyPercentage: total ? ((healthy / total) * 100).toFixed(1) : '0.0',
            moderatePercentage: total ? ((moderate / total) * 100).toFixed(1) : '0.0',
            criticalPercentage: total ? ((critical / total) * 100).toFixed(1) : '0.0',
        },
        pathologies: {
            fraturas: { label: 'Fraturas', count: Number(safeStats.fractures || 0), key: 'fracture' },
            pulpite: { label: 'Pulpite', count: Number(safeStats.pulpitis || 0), key: 'pulpitis' },
            recessao: { label: 'Recessão Gengival', count: Number(safeStats.recession || 0), key: 'recession' },
            reducao: { label: 'Redução de Coroa', count: Number(safeStats.crown_reduction || 0), key: 'crown' },
            calculo: { label: 'Cálculo Dentário', count: Number(safeStats.calculus || 0), key: 'calculus' },
            periodontal: { label: 'Lesões Periodontais', count: Number(safeStats.periodontal || 0), key: 'periodontal' },
            desgaste: { label: 'Desgaste Lingual', count: Number(safeStats.lingual_wear || 0), key: 'lingual' },
            carie: { label: 'Cáries', count: Number(safeStats.caries || 0), key: 'caries' },
            vitrificado: { label: 'Bordo Vitrificado', count: Number(safeStats.vitrified_border || 0), key: 'vitrified' },
            exposicao: { label: 'Exp. Câmara Pulpar', count: Number(safeStats.pulp_exposure || 0), key: 'exposure' },
            edema: { label: 'Edema Gengival', count: Number(safeStats.gingivitis_edema || 0), key: 'edema' },
        }
    };
  }
}