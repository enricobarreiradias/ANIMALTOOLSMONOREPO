import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { DentalEvaluation } from '@lib/data/entities/dental-evaluation.entity';
import { Animal } from '@lib/data/entities/animal.entity';
import { User } from '@lib/data/entities/user.entity'; 
import { Media } from '@lib/data/entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DentalEvaluation, Animal, User, Media]),
    
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}