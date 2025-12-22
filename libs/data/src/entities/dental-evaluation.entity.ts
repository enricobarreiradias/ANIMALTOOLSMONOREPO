import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Animal } from './animal.entity'; 
import { User } from './user.entity';     
import { Media } from './media.entity';
import { 
  FractureLevel, 
  SeverityLevel, 
  GeneralHealthStatus 
} from '../enums/dental-evaluation.enums';

@Entity('dental_evaluation') 
export class DentalEvaluation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // --- RELACIONAMENTOS ---

  @ManyToOne(() => Animal, (animal) => animal.dentalEvaluations)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column({ name: 'animal_id' })
  animalId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'evaluator_user_id' }) 
  evaluator: User;

  @Column({ name: 'evaluator_user_id', type: 'uuid' })
  evaluatorUserId: string;

  @ManyToMany(() => Media, (media) => media.evaluations, {
    cascade: true
  })
  @JoinTable({ 
    name: 'evaluation_media_link', 
    joinColumn: { name: 'evaluation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_id', referencedColumnName: 'id' }
  }) 
  mediaFiles: Media[];

  // --- LOCALIZAÇÃO ---
  
  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @CreateDateColumn({ name: 'evaluation_date' })
  evaluationDate: Date;

  // --- CRITÉRIOS CLINICOS ---

  @Column({
    name: 'general_health_status',
    type: 'simple-enum',
    enum: GeneralHealthStatus,
    nullable: true
  })
  generalHealthStatus: GeneralHealthStatus;

  @Column({ name: 'is_tooth_absent', default: false })
  isToothAbsent: boolean;

  @Column({
    name: 'fracture_level',
    type: 'simple-enum',
    enum: FractureLevel,
    default: FractureLevel.NONE,
  })
  fractureLevel: FractureLevel;

  @Column({ name: 'crown_reduction', default: false })
  crownReduction: boolean;

  @Column({ name: 'lingual_wear', default: false })
  lingualWear: boolean;

  @Column({ name: 'pulpitis', default: false })
  pulpitis: boolean;

  @Column({ name: 'pulp_chamber_exposure', default: false })
  pulpChamberExposure: boolean;

  // --- CRITÉRIOS SUBJETIVOS ---

  @Column({ 
    name: 'gingival_recession', 
    type: 'float', 
    default: 0 
  })
  gingivalRecession: number;

  @Column({
    name: 'periodontal_lesions',
    type: 'simple-enum',
    enum: SeverityLevel,
    default: SeverityLevel.ABSENT
  })
  periodontalLesions: SeverityLevel;

  @Column({
    name: 'gingivitis',
    type: 'simple-enum',
    enum: SeverityLevel,
    default: SeverityLevel.ABSENT,
  })
  gingivitis: SeverityLevel;

  @Column({ name: 'general_observations', type: 'text', nullable: true })
  generalObservations: string;
}
