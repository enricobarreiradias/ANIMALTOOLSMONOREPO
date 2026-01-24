import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'; 
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ExternalAnimalDto } from './dto/external-integration.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('animal')
@UseGuards(AuthGuard('jwt'))
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  // ROTA PARA DISPARAR A SINCRONIZAÇÃO (PULL)
  // GET /api/animal/integration/sync
  @Get('integration/sync')
  async syncAnimals() {
    return await this.animalService.syncFromExternalApi();
  }

  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  @Get('filters/farms')
  getFarmsList() {
    return this.animalService.findUniqueFarms();
  }

  @Get('filters/clients')
  getClientsList() {
    return this.animalService.findUniqueClients();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(+id);
  }

  @Post('integration/webhook') 
  createFromIntegration(@Body() payload: ExternalAnimalDto) {
    return this.animalService.createFromExternal(payload);
  }
  
  

}
