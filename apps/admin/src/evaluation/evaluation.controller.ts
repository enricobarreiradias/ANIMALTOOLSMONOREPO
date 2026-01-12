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
import { UpdateEvaluationDto } from './dto/update-evaluation.dto'; // Descomente se tiver o DTO
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto'; // Descomente se tiver o DTO

@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createEvaluationDto: any) { 
    return await this.evaluationService.create(createEvaluationDto);
  }

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
    const baseUrl = 'http://localhost:3333'; 
    
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

  @Get('pending')
  async findPending() {
    return await this.evaluationService.findPendingEvaluations();
  }

  @Get('history')
  async findHistory(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.evaluationService.findAllHistory(page, limit);
  }

  @Get('seed') 
  async seed() {
    return await this.evaluationService.seed();
  }

  @Get('dashboard')
  async dashboard() {
    return await this.evaluationService.getDashboardStats();
  }

  @Get('animal/:idOrTag')
  async findByAnimal(@Param('idOrTag') idOrTag: string) {
    return await this.evaluationService.findHistoryByAnimal(idOrTag);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.evaluationService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEvaluationDto: any) {
    return await this.evaluationService.update(+id, updateEvaluationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.evaluationService.remove(+id);
  }
}