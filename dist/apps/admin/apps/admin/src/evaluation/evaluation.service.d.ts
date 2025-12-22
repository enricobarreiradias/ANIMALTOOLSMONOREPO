import { Repository } from 'typeorm';
import { DentalEvaluation } from '@lib/data/entities/dental-evaluation.entity';
import { Animal } from '@lib/data/entities/animal.entity';
import { User } from '@lib/data/entities/user.entity';
import { Media } from '@lib/data/entities/media.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { DataSource } from 'typeorm';
export declare class EvaluationService {
    private readonly evaluationRepository;
    private readonly animalRepository;
    private readonly userRepository;
    private readonly mediaRepository;
    private dataSource;
    constructor(evaluationRepository: Repository<DentalEvaluation>, animalRepository: Repository<Animal>, userRepository: Repository<User>, mediaRepository: Repository<Media>, dataSource: DataSource);
    create(createDto: CreateEvaluationDto): Promise<DentalEvaluation>;
    findPendingEvaluations(): Promise<{
        id: string;
        code: string;
        breed: string;
        media: string[];
    }[]>;
    findAllHistory(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            code: string;
            breed: string;
            lastEvaluationDate: Date;
            media: string[];
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    createAnimalFromUpload(code: string, breed: string, mediaPaths: string[]): Promise<Animal>;
    seed(): Promise<Animal>;
    findOne(id: number): Promise<DentalEvaluation>;
    findHistoryByAnimal(animalIdOrTag: string): Promise<DentalEvaluation[]>;
    update(id: number, updateDto: any): Promise<DentalEvaluation>;
    remove(id: number): Promise<DentalEvaluation>;
    getDashboardStats(): Promise<{
        totalAnimals: number;
        totalEvaluations: number;
        pendingEvaluations: number;
        criticalCases: number;
    }>;
}
