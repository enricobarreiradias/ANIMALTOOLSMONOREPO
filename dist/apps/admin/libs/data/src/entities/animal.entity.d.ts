import { DentalEvaluation } from './dental-evaluation.entity';
import { Media } from './media.entity';
export declare class Animal {
    id: number;
    tagCode: string;
    animalIdentifier: string;
    breed: string;
    ageInMonths: number;
    generalStatus: string;
    registrationDate: Date;
    dentalEvaluations: DentalEvaluation[];
    mediaFiles: Media[];
}
