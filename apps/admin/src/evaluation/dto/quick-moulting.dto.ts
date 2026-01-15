import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MoultingStage } from '@app/data/enums/dental-evaluation.enums';

export class QuickMoultingDto {
  @ApiProperty({ description: 'ID do Animal', example: 1 })
  @IsNotEmpty()
  animalId: number | string; 

  @ApiProperty({ description: 'ID do Avaliador (User)', example: 1 })
  @IsOptional()
  evaluatorId?: number;

  @ApiProperty({ enum: MoultingStage, description: 'Estágio da muda (Ex: DL, D2, BC)' })
  @IsEnum(MoultingStage)
  stage: MoultingStage;
}