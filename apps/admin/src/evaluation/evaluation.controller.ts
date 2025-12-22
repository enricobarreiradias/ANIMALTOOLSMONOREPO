import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseInterceptors, 
  UploadedFiles, 
  ValidationPipe, 
  UsePipes,
  Param, 
  Delete, 
  Patch,
  Query,
  DefaultValuePipe,
  ParseIntPipe
} from '@nestjs/common';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';

@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  /**
   * Cria uma nova avaliação dentária para um animal.
   * Payload validado pelo DTO.
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return await this.evaluationService.create(createEvaluationDto);
  }

  /**
   * Recebe as imagens (frontal/vestibular) e os dados do animal.
   * Armazena localmente em /uploads e registra no banco.
   */
  @Post('upload-animal')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'frontal', maxCount: 1 },
    { name: 'vestibular', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async uploadAnimal(
    @UploadedFiles() files: { frontal?: Express.Multer.File[], vestibular?: Express.Multer.File[] },
    @Body() body: { code: string, breed: string }
  ) {

    const baseUrl = 'http://localhost:3000';
    
    const frontalPath = files.frontal 
      ? `${baseUrl}/uploads/${files.frontal[0].filename}` 
      : null;
      
    const vestibularPath = files.vestibular 
      ? `${baseUrl}/uploads/${files.vestibular[0].filename}` 
      : null;

    return await this.evaluationService.createAnimalFromUpload(
      body.code, 
      body.breed, 
      [frontalPath, vestibularPath].filter(Boolean) as string[]
    );
  }

  /**
   * Retorna a lista de animais que possuem imagens mas ainda não foram avaliados.
   */
  @Get('pending')
  async findPending() {
    return await this.evaluationService.findPendingEvaluations();
  }

  /**
   * Retorna o histórico de animais já avaliados.
   */
  @Get('history')
  async findHistory(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.evaluationService.findAllHistory(page, limit);
  }

  /**
   * Popula o banco de dados com dados iniciais para testes.
   */
  @Get('seed') 
  async seed() {
    return await this.evaluationService.seed();
  }

  /**
   * Dashboard com números gerais para o gestor.
   */
  @Get('dashboard')
  async dashboard() {
    return await this.evaluationService.getDashboardStats();
  }

  /**
   * Busca o histórico específico de UM animal (pelo ID ou Brinco).
   */
  @Get('animal/:idOrTag')
  async findByAnimal(@Param('idOrTag') idOrTag: string) {
    return await this.evaluationService.findHistoryByAnimal(idOrTag);
  }

  /**
   * Pega todos os detalhes de uma avaliação única (ao clicar no card).
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.evaluationService.findOne(+id);
  }

  /**
   * Corrige um diagnóstico errado.
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return await this.evaluationService.update(+id, updateEvaluationDto);
  }

  /**
   * Deleta uma avaliação (ex: foto tremida/teste).
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.evaluationService.remove(+id);
  }

}