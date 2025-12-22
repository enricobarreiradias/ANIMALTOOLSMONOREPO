import { Animal } from './animal.entity';
import { DentalEvaluation } from './dental-evaluation.entity';
import { PhotoType } from '../enums/dental-evaluation.enums';
export declare class Media {
    id: number;
    s3UrlPath: string;
    photoType: PhotoType;
    uploadDate: Date;
    animal: Animal;
    animalId: number;
    evaluations: DentalEvaluation[];
}
