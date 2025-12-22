import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DentalEvaluation } from '@lib/data/entities/dental-evaluation.entity';
import { Animal } from '@lib/data/entities/animal.entity';
import { User } from '@lib/data/entities/user.entity';
import { Media } from '@lib/data/entities/media.entity'; 
import { PhotoType } from '@lib/data/enums/dental-evaluation.enums'; 
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { GeneralHealthStatus } from '@lib/data/enums/dental-evaluation.enums';
import { DataSource } from 'typeorm'; 


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

    const animal = await this.animalRepository.findOne({ 
        where: { id: animalIdNumber } 
    });
    
    if (!animal) {
      throw new NotFoundException(`Animal não encontrado.`);
    }

    const evaluator = await this.userRepository.findOne({ 
        where: { id: createDto.evaluatorId } 
    });
    
    if (!evaluator) {
      throw new NotFoundException(`Avaliador não encontrado. Rode o /seed primeiro.`);
    }

    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { animalId, evaluatorId, ...clinicalData } = createDto;

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
      .filter(a => a.dentalEvaluations.length === 0 && a.mediaFiles.length > 0)
      .map(a => ({
        id: a.id.toString(), 
        code: a.tagCode,     
        breed: a.breed,
        media: a.mediaFiles.map(m => m.s3UrlPath) 
      }));
  }

  // --- 3. HISTÓRICO ---
  async findAllHistory(page: number = 1, limit: number = 10) {

    const [result, total] = await this.animalRepository.createQueryBuilder('animal')
      .innerJoinAndSelect('animal.dentalEvaluations', 'evaluation') 
      .leftJoinAndSelect('animal.mediaFiles', 'media') 
      .orderBy('animal.id', 'DESC')
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
      meta: {
        total, 
        page,
        limit
      }
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
      generalStatus: 'PENDING'
    });
    const savedAnimal = await queryRunner.manager.save(newAnimal);

    for (const [index, path] of mediaPaths.entries()) {
      const newMedia = this.mediaRepository.create({
        s3UrlPath: path,
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
    const evaluatorId = "d290f1ee-6c54-4b01-90e6-d701748f0851";
    let user = await this.userRepository.findOne({ where: { id: evaluatorId } });
    
    if (!user) {
      user = this.userRepository.create({
        id: evaluatorId,
        fullName: "Avaliador Padrão",
        email: "avaliador@animaltools.com"
      });
      await this.userRepository.save(user);
    }

    const examplePhotos = [
      "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=600",
      "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600"
    ];

    return await this.createAnimalFromUpload(
      'BOI-SEED-' + Math.floor(Math.random() * 1000),
      'Nelore',
      examplePhotos
    );
  }

  // --- 6. BUSCAR UMA AVALIAÇÃO (DETALHES) ---
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

  // --- 8. ATUALIZAR AVALIAÇÃO ---
  async update(id: number, updateDto: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { animalId, evaluatorId, ...dataToUpdate } = updateDto;

    const evaluation = await this.findOne(id); 

    Object.assign(evaluation, dataToUpdate);

    return await this.evaluationRepository.save(evaluation);
  }

  // --- 9. DELETAR AVALIAÇÃO ---
  async remove(id: number) {
    const evaluation = await this.findOne(id);
    return await this.evaluationRepository.remove(evaluation);
  }

  // --- 10. DASHBOARD (KPIs) ---
  async getDashboardStats() {
    const totalAnimals = await this.animalRepository.count();
    const totalEvaluations = await this.evaluationRepository.count();
    const pending = (await this.findPendingEvaluations()).length;

    const criticalCases = await this.evaluationRepository.count({
        where: { generalHealthStatus: GeneralHealthStatus.CRITICAL }
    });

    return {
      totalAnimals,
      totalEvaluations,
      pendingEvaluations: pending,
      criticalCases,
    };
  }
}