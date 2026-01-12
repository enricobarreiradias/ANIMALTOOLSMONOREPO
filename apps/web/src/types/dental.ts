// Copia fiel dos Enums do Backend para garantir compatibilidade

export enum SeverityScale {
  NONE = 0,          // Saudável
  VERY_MILD = 1,     // Muito Leve
  MILD = 2,          // Leve
  MODERATE = 3,      // Moderado
  SEVERE = 4,        // Severo
  VERY_SEVERE = 5    // Muito Severo
}

export enum ToothCode {
  I1_LEFT = 'I1_L',   // Pinça Esq
  I1_RIGHT = 'I1_R',  // Pinça Dir
  I2_LEFT = 'I2_L',   // Primeiro Médio Esq
  I2_RIGHT = 'I2_R',  // Primeiro Médio Dir
  I3_LEFT = 'I3_L',   // Segundo Médio Esq
  I3_RIGHT = 'I3_R',  // Segundo Médio Dir
  I4_LEFT = 'I4_L',   // Canto Esq
  I4_RIGHT = 'I4_R'   // Canto Dir
}

export interface ToothEvaluationData {
  toothCode: ToothCode;
  fractureLevel: SeverityScale;
  lingualWear: SeverityScale;
  crownReductionMm?: number;
  gingivalRecessionMm?: number;
  pulpitis: SeverityScale;
  isPresent: boolean;
}

export interface EvaluationPayload {
  animalId: number;
  evaluatorId: string; // UUID
  notes: string;
  teeth: ToothEvaluationData[];
}