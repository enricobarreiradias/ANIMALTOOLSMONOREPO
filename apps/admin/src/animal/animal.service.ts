import { Injectable, NotFoundException } from '@nestjs/common';
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
  async findOne(id: number) {
    const animal = await this.animalRepository.findOneBy({ id });
    
    if (!animal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado.`);
    }
    return animal;
  }

  // 4. UPDATE (Atualizar)
  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    await this.findOne(id); 
    
    await this.animalRepository.update(id, updateAnimalDto);
    return this.findOne(id);
  }

  // 5. REMOVE (Deletar)
  async remove(id: number) {
    const animal = await this.findOne(id);
    return this.animalRepository.remove(animal);
  }
}