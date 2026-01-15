import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ExternalAnimalDto } from './dto/external-integration.dto'; // <-- Importe o DTO
import { Animal } from '../../../../libs/data/src/entities/animal.entity';
import { Media } from '../../../../libs/data/src/entities/media.entity'; // <-- Importe a Entidade Media
import { PhotoType } from '../../../../libs/data/src/enums/dental-evaluation.enums'; // <-- Importe o Enum
import { DeepPartial } from 'typeorm'; // Certifique-se de importar isso no topo

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,

    @InjectRepository(Media) // <-- Injeção do Repositório de Mídia
    private mediaRepository: Repository<Media>,
  ) {}

  // 1. CREATE (Método Padrão)
  create(createAnimalDto: CreateAnimalDto) {
    const animal = this.animalRepository.create(createAnimalDto);
    return this.animalRepository.save(animal);
  }

  // --- NOVO MÉTODO: IMPORTAÇÃO EXTERNA ---
  // Este método recebe o JSON "feio" do Renato e salva bonitinho no nosso banco
  async createFromExternal(data: ExternalAnimalDto) {
    const newAnimal = this.animalRepository.create({
      tagCode: data.tagCode,
      chip: data.chip || null, 
      sisbovNumber: data.sisbov || null,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      currentWeight: data.weight || null,
      breed: data.breedName || null,
      farm: data.farmName || null,
      lot: data.lotName || null,
      collectionDate: new Date(),
    });

    const savedAnimal = await this.animalRepository.save(newAnimal);

    // 2. Processa as Fotos
    if (data.photos && data.photos.length > 0) {
      const mediaEntities = data.photos.map((p, index) => {
         return this.mediaRepository.create({
            animal: savedAnimal,
            originalDriveUrl: p.driveLink,
            latitude: p.latitude ?? undefined,
            longitude: p.longitude ?? undefined,
            
            photoType: index === 0 ? PhotoType.FRONTAL : PhotoType.LATERAL_LEFT,
            s3UrlPath: '' 
         } as DeepPartial<Media>); 
      });
      
      await this.mediaRepository.save(mediaEntities);
    }

    return this.findOne(savedAnimal.id); 
  }

  // 2. FIND ALL
  findAll() {
    return this.animalRepository.find();
  }

  // 3. FIND ONE 
  async findOne(id: number) {
    const animal = await this.animalRepository.findOne({ 
      where: { id },
      relations: ['mediaFiles'] 
    });
    
    if (!animal) {
      throw new NotFoundException(`Animal #${id} não encontrado.`);
    }
    return animal;
  }

  // 4. UPDATE
  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    await this.findOne(id); // Garante que existe
    await this.animalRepository.update(id, updateAnimalDto);
    return this.findOne(id);
  }

  // 5. REMOVE
  async remove(id: number) {
    const animal = await this.findOne(id);
    return this.animalRepository.remove(animal);
  }
}