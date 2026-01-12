import { Repository, DataSource } from 'typeorm';
import { DentalEvaluation } from '@app/data/entities/dental-evaluation.entity';
import { ToothEvaluation } from '@app/data/entities/tooth-evaluation.entity';
import { Animal } from '@app/data/entities/animal.entity';
import { User } from '@app/data/entities/user.entity';
import { Media } from '@app/data/entities/media.entity';
export declare class EvaluationService {
    private readonly evaluationRepository;
    private readonly toothRepository;
    private readonly animalRepository;
    private readonly userRepository;
    private readonly mediaRepository;
    private dataSource;
    constructor(evaluationRepository: Repository<DentalEvaluation>, toothRepository: Repository<ToothEvaluation>, animalRepository: Repository<Animal>, userRepository: Repository<User>, mediaRepository: Repository<Media>, dataSource: DataSource);
    create(createDto: any): Promise<DentalEvaluation>;
    findPendingEvaluations(): Promise<{
        id: string;
        code: string;
        breed: string;
        farm: string;
        client: string;
        entryDate: string;
        media: string[];
    }[]>;
    findAllHistory(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            animalId: string;
            code: string;
            breed: string;
            lastEvaluationDate: Date;
            media: string[];
            worstFracture: number;
            isCritical: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(id: number): Promise<DentalEvaluation>;
    update(id: number, updateDto: any): Promise<DentalEvaluation>;
    remove(id: number): Promise<DentalEvaluation>;
    findHistoryByAnimal(animalIdOrTag: string): Promise<DentalEvaluation[]>;
    getDashboardStats(): Promise<{
        totalAnimals: number;
        totalEvaluations: number;
        pendingEvaluations: number;
        criticalCases: number;
    }>;
    createAnimalFromUpload(code: string, breed: string, mediaPaths: string[], details?: {
        farm?: string;
        client?: string;
        location?: string;
        collectionDate?: Date;
        age?: number;
    }): Promise<Animal>;
    seed(): Promise<Animal>;
    private createDefaultHealthyTeeth;
}
