import { DentalEvaluation } from './dental-evaluation.entity';
import { SeverityScale, ToothCode, ToothType } from '../enums/dental-evaluation.enums';
export declare class ToothEvaluation {
    id: number;
    toothCode: ToothCode;
    toothType: ToothType;
    isPresent: boolean;
    crownReductionLevel: number;
    lingualWear: SeverityScale;
    gingivalRecessionLevel: number;
    periodontalLesions: SeverityScale;
    fractureLevel: SeverityScale;
    pulpitis: SeverityScale;
    vitrifiedBorder: SeverityScale;
    pulpChamberExposure: SeverityScale;
    gingivitisEdema: SeverityScale;
    gingivitisColor: number;
    dentalCalculus: SeverityScale;
    abnormalColor: number;
    caries: SeverityScale;
    evaluation: DentalEvaluation;
    evaluationId: number;
}
