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

  // Certifique-se que o Enum PhotoType tenha 'FRONTAL' e 'SUPERIOR' (ou 'OCCLUSAL')
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

  @ManyToOne(() => Animal, (animal) => animal.mediaFiles)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column({ name: 'animal_id' })
  animalId: number;

  @ManyToMany(() => DentalEvaluation, (evaluation) => evaluation.mediaFiles)
  evaluations: DentalEvaluation[];
}