import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { Animal } from './animal.entity';
import { DentalEvaluation } from './dental-evaluation.entity';
import { PhotoType } from '../enums/dental-evaluation.enums'; 

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 's3_url_path', type: 'text' })
  s3UrlPath: string;

  @Column({ 
    name: 'photo_type',
    type: 'simple-enum',
    enum: PhotoType,
    default: PhotoType.FRONTAL
  })
  photoType: PhotoType;

  @CreateDateColumn({ name: 'upload_date' })
  uploadDate: Date;

  // --- RELACIONAMENTOS ---

  // Relação com Animal
  @ManyToOne(() => Animal, (animal) => animal.mediaFiles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column({ name: 'animal_id' })
  animalId: number;

  // Relação com Avaliação 
  // Útil se no futuro quisermos saber quais fotos foram usadas em qual laudo
  @ManyToMany(() => DentalEvaluation, (evaluation) => evaluation.mediaFiles)
  evaluations: DentalEvaluation[];
}