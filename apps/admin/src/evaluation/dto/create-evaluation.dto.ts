import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { FractureLevel, SeverityLevel } from '@lib/data/enums/dental-evaluation.enums';

export class CreateEvaluationDto {
  @IsNotEmpty() @IsUUID() animalId: string;
  @IsNotEmpty() @IsUUID() evaluatorId: string;

  @IsBoolean() isToothAbsent: boolean;
  @IsEnum(FractureLevel) fractureLevel: FractureLevel;
  @IsBoolean() crownReduction: boolean;
  @IsBoolean() lingualWear: boolean;
  @IsBoolean() pulpitis: boolean;
  @IsBoolean() pulpChamberExposure: boolean;
  @IsNumber() gingivalRecession: number; 
  @IsEnum(SeverityLevel) periodontalLesions: SeverityLevel; 
  @IsEnum(SeverityLevel) gingivitis: SeverityLevel;
  @IsOptional() @IsString() observations?: string;
}