import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  UseGuards, Query, DefaultValuePipe, ParseIntPipe, Req // <--- Req Importado
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../../libs/data/src/entities/user.entity'; // <--- Import User

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  // --- ROTAS PÚBLICAS  ---

  @Post('integration/webhook') 
  async webhook(@Body() externalData: any) {
    return await this.animalService.processWebhook(externalData);
  }

  @Get('integration/sync')
  async syncAnimals(
    @Query('start') start?: string, 
    @Query('end') end?: string      
  ) {
    return await this.animalService.syncFromExternalApi(start, end);
  }

  // --- ROTAS PROTEGIDAS ---
  
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }
  
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.animalService.findAll();
  }

  @Get('filters/farms')
  @UseGuards(AuthGuard('jwt'))
  getFarmsList() {
    return this.animalService.findUniqueFarms();
  }

  @Get('filters/clients')
  @UseGuards(AuthGuard('jwt'))
  getClientsList() {
    return this.animalService.findUniqueClients();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(+id);
  }

  // --- UPDATE (Passa o Usuário) ---
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
      @Param('id') id: string, 
      @Body() updateAnimalDto: UpdateAnimalDto,
      @Req() req: any // <--- Request
  ) {
    const user = req.user as User;
    return this.animalService.update(+id, updateAnimalDto, user);
  }

  // --- DELETE (Passa o Usuário) ---
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(
      @Param('id') id: string,
      @Req() req: any // <--- Request
  ) {
    const user = req.user as User;
    return this.animalService.remove(+id, user);
  }
}