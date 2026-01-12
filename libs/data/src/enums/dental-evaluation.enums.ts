// Alterado para atender a solicitação de 3 níveis (Normal, Moderado, Crítico)
export enum SeverityScale {
  NONE = 0,      // Saudável / Normal / Ausente
  MODERATE = 1,  // Moderado
  SEVERE = 2,    // Crítico / Severo
}

// Novo Enum solicitado: Cor deve ser apenas Normal ou Alterado
export enum ColorScale {
  NORMAL = 0,
  ALTERED = 1,
}

// Novo Enum solicitado: Identificar dente de Leite vs Permanente
export enum ToothType {
  DECIDUOUS = 'DECIDUOUS', // Dente de Leite
  PERMANENT = 'PERMANENT', // Dente Permanente
}

export enum BinaryStatus {
  ABSENT = 0,
  PRESENT = 1
}

// Mantido IGUAL ao seu original para não quebrar o mapa do frontend
export enum ToothCode {
  I1_LEFT = 'I1_L',
  I1_RIGHT = 'I1_R',
  I2_LEFT = 'I2_L',
  I2_RIGHT = 'I2_R',
  I3_LEFT = 'I3_L',
  I3_RIGHT = 'I3_R',
  I4_LEFT = 'I4_L',
  I4_RIGHT = 'I4_R'
}

export enum PhotoType {
  FRONTAL = 'FRONTAL',
  LINGUAL = 'LINGUAL',
  LATERAL_LEFT = 'LATERAL_LEFT',
  LATERAL_RIGHT = 'LATERAL_RIGHT',
  SUPERIOR = 'SUPERIOR'
}