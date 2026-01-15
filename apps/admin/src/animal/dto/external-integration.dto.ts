import { Expose, Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, ValidateNested, IsArray } from 'class-validator';

// 1. DTO para as FOTOS que vêm dentro do JSON
export class ExternalPhotoDto {
  @Expose({ name: 'foto_id' })
  photoId: number;

  @Expose({ name: 'link_do_driver' })
  driveLink: string;

  @Expose({ name: 'latitude_latitude' })
  latitude: number;

  @Expose({ name: 'latitude_longitude' })
  longitude: number;
}

// 2. DTO para o ANIMAL (O JSON principal)
export class ExternalAnimalDto {
  @Expose({ name: 'n°_do_Animal' }) // Mapeia a chave feia...
  tagCode: string;                 // ...para a variável bonita

  @Expose({ name: 'chip' })
  chip: string;

  @Expose({ name: 'n°_do_SISBOV' })
  sisbov: string;

  @Expose({ name: 'data_de_nascimento' })
  birthDate: string;

  @Expose({ name: 'nome_raca_id' })
  breedName: string;

  @Expose({ name: 'peso_atual' })
  weight: number;

  @Expose({ name: 'nome_centro_de_custo_id' })
  farmName: string;

  @Expose({ name: 'nome_lote_id' })
  lotName: string;

  @Expose({ name: 'fotos' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExternalPhotoDto) // Converte a lista de fotos automaticamente
  photos: ExternalPhotoDto[];
}