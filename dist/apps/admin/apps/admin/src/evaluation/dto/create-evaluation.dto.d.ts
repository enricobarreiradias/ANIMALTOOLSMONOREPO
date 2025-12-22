import { FractureLevel, SeverityLevel } from '@lib/data/enums/dental-evaluation.enums';
export declare class CreateEvaluationDto {
    animalId: string;
    evaluatorId: string;
    isToothAbsent: boolean;
    fractureLevel: FractureLevel;
    crownReduction: boolean;
    lingualWear: boolean;
    pulpitis: boolean;
    pulpChamberExposure: boolean;
    gingivalRecession: number;
    periodontalLesions: SeverityLevel;
    gingivitis: SeverityLevel;
    observations?: string;
}
