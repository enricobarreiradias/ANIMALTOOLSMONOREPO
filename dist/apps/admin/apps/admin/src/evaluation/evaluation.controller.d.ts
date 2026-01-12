import { EvaluationService } from './evaluation.service';
export declare class EvaluationController {
    private readonly evaluationService;
    constructor(evaluationService: EvaluationService);
    create(createEvaluationDto: any): Promise<import("@app/data/entities/dental-evaluation.entity").DentalEvaluation>;
    uploadAnimal(files: {
        frontal?: Express.Multer.File[];
        vestibular?: Express.Multer.File[];
    }, body: {
        code: string;
        breed: string;
    }): Promise<import("@app/data/entities/animal.entity").Animal>;
    findPending(): Promise<{
        id: string;
        code: string;
        breed: string;
        farm: string;
        client: string;
        entryDate: string;
        media: string[];
    }[]>;
    findHistory(page: number, limit: number): Promise<{
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
    seed(): Promise<import("@app/data/entities/animal.entity").Animal>;
    dashboard(): Promise<{
        totalAnimals: number;
        totalEvaluations: number;
        pendingEvaluations: number;
        criticalCases: number;
    }>;
    findByAnimal(idOrTag: string): Promise<import("@app/data/entities/dental-evaluation.entity").DentalEvaluation[]>;
    findOne(id: string): Promise<import("@app/data/entities/dental-evaluation.entity").DentalEvaluation>;
    update(id: string, updateEvaluationDto: any): Promise<import("@app/data/entities/dental-evaluation.entity").DentalEvaluation>;
    remove(id: string): Promise<import("@app/data/entities/dental-evaluation.entity").DentalEvaluation>;
}
