import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateEvaluationDto {
  @IsNotEmpty()
  @IsString()
  animalId: string;

  @IsNotEmpty()
  @IsString()
  evaluatorId: string;

  @IsOptional()
  @IsString()
  generalObservations?: string;

  // --- VARIÁVEIS DO Q&A (Tabela 1) ---

  // 1. Presença ou ausência do dente (Binário: 0/1)
  @IsOptional()
  @IsBoolean()
  toothPresence?: boolean;

  // 2. Fratura do dente (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  toothFracture?: number;

  // 3. Redução da coroa dentária (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  crownReduction?: number;

  // 4. Superfície de corte com bordo vitrificado (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  vitrifiedBorder?: number;

  // 5. Desgaste lingual (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  lingualWear?: number;

  // 6. Pulpite (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  pulpitis?: number;

  // 7. Exposição da câmara pulpar (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  pulpChamberExposure?: number;

  // 8. Cálculo dentário (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  dentalCalculus?: number;

  // 9. Coloração anormal (Binário/Severidade -> Vamos usar 0-5 sendo 0 normal)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  abnormalColor?: number;

  // 10. Cárie (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  caries?: number;

  // 11. Recessão gengival (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  gingivalRecession?: number;

  // 12. Lesões periodontais (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  periodontalLesions?: number;

  // 13. Gengivite - Edema (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  gingivitisEdema?: number;

  // 14. Gengivite - Coloração (Severidade 1-5)
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  gingivitisColor?: number;
}