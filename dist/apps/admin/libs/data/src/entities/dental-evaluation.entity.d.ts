import { Animal } from './animal.entity';
import { User } from './user.entity';
import { Media } from './media.entity';
import { ToothEvaluation } from './tooth-evaluation.entity';
export declare class DentalEvaluation {
    id: number;
    animal: Animal;
    animalId: number;
    evaluator: User;
    evaluatorUserId: string;
    mediaFiles: Media[];
    teeth: ToothEvaluation[];
    evaluationDate: Date;
    generalObservations: string;
    generalGingivitisScore: number;
}
