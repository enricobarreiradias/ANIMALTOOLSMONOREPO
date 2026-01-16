import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm';
import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ExternalAnimalDto } from './dto/external-integration.dto'; 
import { Animal } from '../../../../libs/data/src/entities/animal.entity';
import { Media } from '../../../../libs/data/src/entities/media.entity'; 
import { PhotoType } from '../../../../libs/data/src/enums/dental-evaluation.enums'; 

@Injectable()
export class AnimalService {
  private readonly logger = new Logger(AnimalService.name);
  private s3Client: S3Client;
  // Nome do bucket fixo ou via variável de ambiente (recomendado .env)
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME || 'animaltools-media';

  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,

    @InjectRepository(Media) 
    private mediaRepository: Repository<Media>,

    private dataSource: DataSource,
  ) {
    // Inicializa o S3 (assumindo que as credenciais estão no .env)
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  // 1. CREATE 
  create(createAnimalDto: CreateAnimalDto) {
    const animal = this.animalRepository.create(createAnimalDto);
    return this.animalRepository.save(animal);
  }

  // --- NOVO MÉTODO: IMPORTAÇÃO EXTERNA COMPLETA ---
  async createFromExternal(data: ExternalAnimalDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // A. Combinar Data + Hora de entrada
      let fullEntryDate: Date | null = null;
      if (data.entryDateRaw) {
        const timeString = data.entryTimeRaw || '00:00:00';
        fullEntryDate = new Date(`${data.entryDateRaw}T${timeString}`);
      }

      // B. Calcular Idade em Meses
      let calculatedAge: number | null = null;
      if (data.birthDate) {
        const birth = new Date(data.birthDate);
        const today = new Date();
        calculatedAge = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
      }

      // C. Criar Entidade com TODOS os campos
      const newAnimal = this.animalRepository.create({
        tagCode: data.tagCode,
        chip: data.chip || null, 
        sisbovNumber: data.sisbov || null,
        
        // Dados Genéricos
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        currentWeight: data.weight || null,
        breed: data.breedName || null,
        farm: data.farmName || null,
        lot: data.lotName || null,
        location: data.locationName || null,
        collectionDate: new Date(),
        age: calculatedAge,

        // Novos Campos Específicos
        bodyScore: data.score || null,
        coatColor: data.coatName || null,
        category: data.categoryName || null,
        status: data.status || 'Ativo',
        entryDate: fullEntryDate,

        // IDs Externos (opcionais, mas guardados)
        externalCategoryId: data.categoryId || null,
        externalBreedId: data.breedId || null,
        externalCoatId: data.coatId || null,
      });

      const savedAnimal = await queryRunner.manager.save(newAnimal);

      // D. Processar Fotos (Drive -> Download -> S3 -> Banco)
      if (data.photos && data.photos.length > 0) {
        for (const [index, p] of data.photos.entries()) {
           let s3Url = '';

           try {
             // Tenta fazer o processo completo se for link do Drive
             if (p.driveLink && p.driveLink.includes('drive.google.com')) {
                this.logger.log(`Processando imagem ${index + 1} do animal ${savedAnimal.tagCode}...`);
                s3Url = await this.processDriveImageToS3(p.driveLink, savedAnimal.tagCode, index);
             }
           } catch (error) {
             this.logger.error(`Falha ao processar imagem do Drive: ${error.message}`);
             // Se falhar, segue a vida sem URL do S3, mas salva o original
           }

           const media = this.mediaRepository.create({
             animal: savedAnimal,
             originalDriveUrl: p.driveLink,
             s3UrlPath: s3Url, // Aqui entra o link final da AWS
             latitude: p.latitude ?? null,
             longitude: p.longitude ?? null,
             
             photoType: index === 0 ? PhotoType.FRONTAL : PhotoType.LATERAL_LEFT,
           });
           
           await queryRunner.manager.save(media);
        }
      }
      
      await queryRunner.commitTransaction();
      return this.findOne(savedAnimal.id); 

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // --- MÉTODOS AUXILIARES ---

  // Lógica para baixar do Drive e subir pro S3
  private async processDriveImageToS3(driveLink: string, animalCode: string, index: number): Promise<string> {
      // 1. Extrair ID do arquivo do link
      const fileIdMatch = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (!fileIdMatch) return '';
      
      const fileId = fileIdMatch[1];
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

      // 2. Baixar a imagem
      const response = await axios({
          url: downloadUrl,
          method: 'GET',
          responseType: 'arraybuffer' 
      });

      // 3. Definir nome único
      const fileName = `integrations/${animalCode}-${Date.now()}-${index}.jpg`;

      // 4. Upload para o S3
      await this.s3Client.send(new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: response.data,
          ContentType: 'image/jpeg',
          ACL: 'public-read' // Atenção: Verifique se o bucket permite ACLs públicas
      }));

      // 5. Retornar URL pública
      return `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
  }

  // 2. FIND ALL
  findAll() {
    return this.animalRepository.find();
  }

  // 3. FIND ONE 
  async findOne(id: number) {
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['mediaFiles'],
    });

    if (!animal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado.`);
    }

    const geoMedia = animal.mediaFiles?.find(m => m.latitude && m.longitude);
    const coordinates = geoMedia 
      ? { lat: geoMedia.latitude, lng: geoMedia.longitude } 
      : undefined;

    return {
      // Retorna todos os dados, inclusive os novos se quiser exibir
      ...animal,
      id: animal.id.toString(), // Garante string p/ frontend se necessário
      code: animal.tagCode, 
      
      coordinates: coordinates,

      media: animal.mediaFiles?.map(m => ({
         s3UrlPath: m.s3UrlPath,
         originalDriveUrl: m.originalDriveUrl
      })) || [],
    };
  }

  // 4. UPDATE
  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    await this.findOne(id); 
    await this.animalRepository.update(id, updateAnimalDto);
    return this.findOne(id);
  }

  // 5. REMOVE
  async remove(id: number) {
    const animalEntity = await this.animalRepository.findOneBy({ id });

    if (!animalEntity) {
        throw new NotFoundException(`Animal #${id} não encontrado.`);
    }

    return this.animalRepository.remove(animalEntity);
  }
}