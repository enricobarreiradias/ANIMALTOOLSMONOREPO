import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class ExternalPhotoDto {
  @Expose({ name: 'foto_id' }) 
  @IsNumber()
  photoId: number;

  @Expose({ name: 'link_do_driver' })
  @IsString()
  driveLink: string;

  // O Renato mandou "latitude_latitude". Vamos corrigir para "latitude"
  @Expose({ name: 'latitude_latitude' }) 
  @IsNumber()
  @IsOptional()
  latitude?: number;

  // O Renato mandou "latitude_longitude". Vamos corrigir para "longitude"
  @Expose({ name: 'latitude_longitude' })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}

export class ExternalAnimalDto {
  @Expose({ name: 'n°_do_Animal' }) 
  @IsString()
  tagCode: string;

  @Expose({ name: 'chip' })
  @IsString()
  @IsOptional()
  chip?: string;

  @Expose({ name: 'n°_do_SISBOV' })
  @IsString()
  @IsOptional()
  sisbov?: string;

  @Expose({ name: 'data_de_nascimento' })
  @IsDateString() 
  @IsOptional()
  birthDate?: string;

  @Expose({ name: 'peso_atual' })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @Expose({ name: 'nome_raca_id' })
  @IsString()
  @IsOptional()
  breedName?: string;

  @Expose({ name: 'nome_centro_de_custo_id' })
  @IsString()
  @IsOptional()
  farmName?: string;

  @Expose({ name: 'nome_lote_id' })
  @IsString()
  @IsOptional()
  lotName?: string;

  @Expose({ name: 'fotos' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExternalPhotoDto)
  photos: ExternalPhotoDto[];
}