import { Animal } from './animal.entity';
import { User } from './user.entity';
import { Media } from './media.entity';
import { FractureLevel, SeverityLevel, GeneralHealthStatus } from '../enums/dental-evaluation.enums';
export declare class DentalEvaluation {
    id: number;
    animal: Animal;
    animalId: number;
    evaluator: User;
    evaluatorUserId: string;
    mediaFiles: Media[];
    latitude: number;
    longitude: number;
    evaluationDate: Date;
    generalHealthStatus: GeneralHealthStatus;
    isToothAbsent: boolean;
    fractureLevel: FractureLevel;
    crownReduction: boolean;
    lingualWear: boolean;
    pulpitis: boolean;
    pulpChamberExposure: boolean;
    gingivalRecession: number;
    periodontalLesions: SeverityLevel;
    gingivitis: SeverityLevel;
    generalObservations: string;
}
