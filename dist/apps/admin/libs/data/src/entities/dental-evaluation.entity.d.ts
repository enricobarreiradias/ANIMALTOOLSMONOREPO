import { Animal } from './animal.entity';
import { User } from './user.entity';
import { Media } from './media.entity';
export declare class DentalEvaluation {
    id: number;
    animal: Animal;
    animalId: number;
    evaluator: User;
    evaluatorUserId: string;
    mediaFiles: Media[];
    evaluationDate: Date;
    generalObservations: string;
    toothPresence: boolean;
    toothFracture: number;
    crownReduction: number;
    vitrifiedBorder: number;
    lingualWear: number;
    pulpitis: number;
    pulpChamberExposure: number;
    dentalCalculus: number;
    abnormalColor: number;
    caries: number;
    gingivalRecession: number;
    periodontalLesions: number;
    gingivitisEdema: number;
    gingivitisColor: number;
}
