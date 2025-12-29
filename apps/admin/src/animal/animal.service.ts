import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../../../../libs/data/src/entities/animal.entity';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  // 1. CREATE (Salvar no Banco)
  create(createAnimalDto: CreateAnimalDto) {
    const animal = this.animalRepository.create(createAnimalDto);
    return this.animalRepository.save(animal);
  }

  // 2. FIND ALL (Buscar Todos)
  findAll() {
    return this.animalRepository.find();
  }

  // 3. FIND ONE (Buscar um pelo ID)
  findOne(id: number) {
    // ATENÇÃO: Se seu banco usar UUID (letras e números), 
    // mude o tipo 'id: number' para 'id: any' ou 'id: string'
    return this.animalRepository.findOneBy({ id } as any);
  }

  // 4. UPDATE (Atualizar)
  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    await this.animalRepository.update(id, updateAnimalDto);
    return this.findOne(id);
  }

  // 5. REMOVE (Deletar)
  remove(id: number) {
    return this.animalRepository.delete(id);
  }
}