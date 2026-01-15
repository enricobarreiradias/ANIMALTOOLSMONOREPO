import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { Animal } from '../../../../libs/data/src/entities/animal.entity';
import { Media } from '../../../../libs/data/src/entities/media.entity'; // <-- Importe a entidade Media

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal, Media]) 
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [AnimalService]
})
export class AnimalModule {}