export enum FractureLevel {
  NONE = 'NONE',
  ENAMEL = 'ENAMEL',
  DENTINE = 'DENTINE',
  PULP = 'PULP',
}

export enum SeverityLevel {
  ABSENT = 'ABSENT',
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
}

export enum GeneralHealthStatus {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  REGULAR = 'REGULAR',
  POOR = 'POOR',
  CRITICAL = 'CRITICAL'
}

export enum PhotoType {
  FRONTAL = 'FRONTAL',
  SUPERIOR = 'SUPERIOR', // Ou 'DORSAL' / 'OCCLUSAL' - "Vista de Cima"
  LATERAL_LEFT = 'LATERAL_LEFT', 
  LATERAL_RIGHT = 'LATERAL_RIGHT' 
}