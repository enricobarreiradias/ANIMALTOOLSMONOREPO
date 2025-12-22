import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
export declare class EvaluationController {
    private readonly evaluationService;
    constructor(evaluationService: EvaluationService);
    create(createEvaluationDto: CreateEvaluationDto): Promise<import("@lib/data/entities/dental-evaluation.entity").DentalEvaluation>;
    uploadAnimal(files: {
        frontal?: Express.Multer.File[];
        vestibular?: Express.Multer.File[];
    }, body: {
        code: string;
        breed: string;
    }): Promise<import("@lib/data/entities/animal.entity").Animal>;
    findPending(): Promise<{
        id: string;
        code: string;
        breed: string;
        media: string[];
    }[]>;
    findHistory(page: number, limit: number): Promise<{
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
    seed(): Promise<import("@lib/data/entities/animal.entity").Animal>;
    dashboard(): Promise<{
        totalAnimals: number;
        totalEvaluations: number;
        pendingEvaluations: number;
        criticalCases: number;
    }>;
    findByAnimal(idOrTag: string): Promise<import("@lib/data/entities/dental-evaluation.entity").DentalEvaluation[]>;
    findOne(id: string): Promise<import("@lib/data/entities/dental-evaluation.entity").DentalEvaluation>;
    update(id: string, updateEvaluationDto: UpdateEvaluationDto): Promise<import("@lib/data/entities/dental-evaluation.entity").DentalEvaluation>;
    remove(id: string): Promise<import("@lib/data/entities/dental-evaluation.entity").DentalEvaluation>;
}
