import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
export declare class AnimalService {
    create(createAnimalDto: CreateAnimalDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAnimalDto: UpdateAnimalDto): string;
    remove(id: number): string;
}
