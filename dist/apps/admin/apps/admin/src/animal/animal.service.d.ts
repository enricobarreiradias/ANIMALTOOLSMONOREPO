import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../../../../libs/data/src/entities/animal.entity';
export declare class AnimalService {
    private animalRepository;
    constructor(animalRepository: Repository<Animal>);
    create(createAnimalDto: CreateAnimalDto): Promise<Animal>;
    findAll(): Promise<Animal[]>;
    findOne(id: number): Promise<Animal | null>;
    update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
