import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
export declare class AnimalController {
    private readonly animalService;
    constructor(animalService: AnimalService);
    create(createAnimalDto: CreateAnimalDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAnimalDto: UpdateAnimalDto): string;
    remove(id: string): string;
}
