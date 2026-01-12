import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
export declare class AnimalController {
    private readonly animalService;
    constructor(animalService: AnimalService);
    create(createAnimalDto: CreateAnimalDto): Promise<import("@app/data/entities/animal.entity").Animal>;
    findAll(): Promise<import("@app/data/entities/animal.entity").Animal[]>;
    findOne(id: string): Promise<import("@app/data/entities/animal.entity").Animal | null>;
    update(id: string, updateAnimalDto: UpdateAnimalDto): Promise<import("@app/data/entities/animal.entity").Animal | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
