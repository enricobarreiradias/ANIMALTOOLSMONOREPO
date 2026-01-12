import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { DentalEvaluation } from './dental-evaluation.entity';
import { Media } from './media.entity';

@Entity('animal') 
export class Animal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'tag_code', unique: true })   
  tagCode: string;

  @Column()
  breed: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  farm: string;

  @Column({ nullable: true })
  client: string;

  @Column({ nullable: true })
  location: string;

  @Column({ name: 'collection_date', type: 'timestamp', nullable: true })
  collectionDate: Date;

  // --- CAMPOS LEGADOS ---
  @Column({ name: 'animal_identifier', nullable: true })
  animalIdentifier: string;

  @Column({ name: 'age_in_months', nullable: true }) // Mantido caso o legado use
  ageInMonths: number;

  @Column({ name: 'general_status', nullable: true })
  generalStatus: string;

  // --- DATAS E RELACIONAMENTOS ---
  @CreateDateColumn({ name: 'registration_date' })
  registrationDate: Date;

  @OneToMany(() => DentalEvaluation, (evaluation) => evaluation.animal)
  dentalEvaluations: DentalEvaluation[];
  
  @OneToMany(() => Media, (media) => media.animal)
  mediaFiles: Media[]; 
}