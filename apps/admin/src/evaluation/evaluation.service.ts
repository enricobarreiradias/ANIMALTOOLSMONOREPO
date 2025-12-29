import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, MoreThanOrEqual } from 'typeorm';
import { DentalEvaluation } from '../../../../libs/data/src/entities/dental-evaluation.entity';
import { Animal } from '../../../../libs/data/src/entities/animal.entity';
import { User } from '../../../../libs/data/src/entities/user.entity';
import { Media } from '../../../../libs/data/src/entities/media.entity'; 
import { PhotoType } from '../../../../libs/data/src/enums/dental-evaluation.enums'; 
import { CreateEvaluationDto } from './dto/create-evaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(DentalEvaluation)
    private readonly evaluationRepository: Repository<DentalEvaluation>,
    
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>, 
    
    private dataSource: DataSource,
  ) {}

  // --- 1. SALVAR AVALIAÇÃO ---
  async create(createDto: CreateEvaluationDto): Promise<DentalEvaluation> {
    const animalIdNumber = Number(createDto.animalId);

    // 1. Busca o Animal
    const animal = await this.animalRepository.findOne({ 
        where: { id: animalIdNumber } 
    });
    
    if (!animal) {
      throw new NotFoundException(`Animal não encontrado.`);
    }

    // 2. Busca o Avaliador (Garantindo que não seja null)
    let evaluator = await this.userRepository.findOne({ 
        where: { id: createDto.evaluatorId } 
    });
    
    // Fallback: Se não achar o ID específico, pega o primeiro usuário do banco (útil em dev)
    if (!evaluator) {
      evaluator = await this.userRepository.findOne({ order: { registrationDate: 'ASC' } });
    }

    // Se mesmo assim não tiver usuário, para tudo.
    if (!evaluator) {
      throw new NotFoundException(`Nenhum avaliador encontrado no sistema. Rode o seed ou crie um usuário.`);
    }

    // 3. Separa os dados clínicos dos IDs
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { animalId, evaluatorId, ...clinicalData } = createDto;

    // 4. Cria a entidade (Agora evaluator é garantido como User)
    const evaluation = this.evaluationRepository.create({
      ...clinicalData, 
      animal: animal, 
      evaluator: evaluator
    });
    
    return await this.evaluationRepository.save(evaluation);
  }

  // --- 2. LISTAR PENDENTES ---
  async findPendingEvaluations() {
    const animals = await this.animalRepository.find({
       relations: ['dentalEvaluations', 'mediaFiles'], 
    });
    
    return animals
      .filter(a => a.dentalEvaluations.length === 0) 
      .map(a => ({
        id: a.id.toString(), 
        code: a.tagCode,     
        breed: a.breed,
        media: a.mediaFiles?.map(m => m.s3UrlPath) || []
      }));
  }

  // --- 3. HISTÓRICO ---
  async findAllHistory(page: number = 1, limit: number = 10) {
    const [result, total] = await this.animalRepository.createQueryBuilder('animal')
      .innerJoinAndSelect('animal.dentalEvaluations', 'evaluation') 
      .leftJoinAndSelect('animal.mediaFiles', 'media') 
      .orderBy('evaluation.evaluationDate', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: result.map(a => ({
        id: a.id.toString(),
        code: a.tagCode,
        breed: a.breed,
        lastEvaluationDate: a.dentalEvaluations[0]?.evaluationDate,
        media: a.mediaFiles.map(m => m.s3UrlPath)
      })),
      meta: { total, page, limit }
    };
  }

  // --- 4. CRIAR ANIMAL VIA UPLOAD ---
  async createAnimalFromUpload(code: string, breed: string, mediaPaths: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newAnimal = this.animalRepository.create({
        tagCode: code,
        breed: breed,
      });
      const savedAnimal = await queryRunner.manager.save(newAnimal);

      for (const [index, path] of mediaPaths.entries()) {
        const newMedia = this.mediaRepository.create({
          s3UrlPath: path,
          // Ajustado para o Enum correto (assumindo FRONTAL e SUPERIOR)
          photoType: index === 0 ? PhotoType.FRONTAL : PhotoType.VESTIBULAR, 
          animal: savedAnimal
        });
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

  // --- 5. SEED ---
  async seed() {
    return await this.createAnimalFromUpload(
      'BOI-TESTE-' + Math.floor(Math.random() * 1000),
      'Nelore',
      ['https://via.placeholder.com/400', 'https://via.placeholder.com/400']
    );
  }

  // --- 6. BUSCAR UMA AVALIAÇÃO ---
  async findOne(id: number) {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
      relations: ['animal', 'evaluator', 'mediaFiles'],
    });

    if (!evaluation) {
      throw new NotFoundException(`Avaliação #${id} não encontrada.`);
    }
    return evaluation;
  }

  // --- 7. HISTÓRICO POR ANIMAL ---
  async findHistoryByAnimal(animalIdOrTag: string) {
    const isId = !isNaN(Number(animalIdOrTag));
    
    const query = this.evaluationRepository.createQueryBuilder('evaluation')
      .leftJoinAndSelect('evaluation.animal', 'animal')
      .leftJoinAndSelect('evaluation.mediaFiles', 'media')
      .leftJoinAndSelect('evaluation.evaluator', 'evaluator');

    if (isId) {
      query.where('animal.id = :id', { id: animalIdOrTag });
    } else {
      query.where('animal.tagCode = :tag', { tag: animalIdOrTag });
    }

    return await query.orderBy('evaluation.evaluationDate', 'DESC').getMany();
  }

  // --- 8. ATUALIZAR ---
  async update(id: number, updateDto: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { animalId, evaluatorId, ...dataToUpdate } = updateDto;
    const evaluation = await this.findOne(id); 
    Object.assign(evaluation, dataToUpdate);
    return await this.evaluationRepository.save(evaluation);
  }

  // --- 9. DELETAR ---
  async remove(id: number) {
    const evaluation = await this.findOne(id);
    return await this.evaluationRepository.remove(evaluation);
  }

  // --- 10. DASHBOARD (KPIs) ---
  async getDashboardStats() {
    const totalAnimals = await this.animalRepository.count();
    const totalEvaluations = await this.evaluationRepository.count();
    
    const pendingList = await this.findPendingEvaluations();
    const pending = pendingList.length;

    // CORREÇÃO: Definindo "Casos Críticos" usando a nova estrutura (0-5)
    // Consideramos crítico se Fratura >= 4 OU Pulpite >= 4
    const criticalCases = await this.evaluationRepository.count({
        where: [
            { toothFracture: MoreThanOrEqual(4) },
            { pulpitis: MoreThanOrEqual(4) }
        ]
    });

    return {
      totalAnimals,
      totalEvaluations,
      pendingEvaluations: pending,
      criticalCases,
    };
  }
}