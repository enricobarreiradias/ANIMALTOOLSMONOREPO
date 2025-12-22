import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { DentalEvaluation } from './dental-evaluation.entity';
import { Media } from './media.entity';

@Entity('animal') 
export class Animal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'tag_code' })   
  tagCode: string;

  @Column({ name: 'animal_identifier', nullable: true })
  animalIdentifier: string;

  @Column()
  breed: string;

  @Column({ name: 'age_in_months', nullable: true })
  ageInMonths: number;

  @Column({ name: 'general_status', nullable: true })
  generalStatus: string;

  @CreateDateColumn({ name: 'registration_date' })
  registrationDate: Date;

  // --- RELACIONAMENTOS ---

  @OneToMany(() => DentalEvaluation, (evaluation) => evaluation.animal)
  dentalEvaluations: DentalEvaluation[];
  
  @OneToMany(() => Media, (media) => media.animal)
  mediaFiles: Media[]; 
}