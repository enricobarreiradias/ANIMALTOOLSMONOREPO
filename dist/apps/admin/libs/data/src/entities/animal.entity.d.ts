import { DentalEvaluation } from './dental-evaluation.entity';
import { Media } from './media.entity';
export declare class Animal {
    id: number;
    tagCode: string;
    breed: string;
    age: number;
    farm: string;
    client: string;
    location: string;
    collectionDate: Date;
    animalIdentifier: string;
    ageInMonths: number;
    generalStatus: string;
    registrationDate: Date;
    dentalEvaluations: DentalEvaluation[];
    mediaFiles: Media[];
}
