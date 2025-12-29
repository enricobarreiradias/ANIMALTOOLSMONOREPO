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

@Entity('dental_evaluation')
export class DentalEvaluation {
  @PrimaryGeneratedColumn('increment')
  id: number; // Mantido como NUMBER

  // --- RELACIONAMENTOS ---

  @ManyToOne(() => Animal, (animal) => animal.dentalEvaluations)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column({ name: 'animal_id' })
  animalId: number; // Mantido como NUMBER

  @ManyToOne(() => User)
  @JoinColumn({ name: 'evaluator_user_id' })
  evaluator: User;

  @Column({ name: 'evaluator_user_id', type: 'uuid' })
  evaluatorUserId: string; // Mantido como UUID

  @ManyToMany(() => Media, (media) => media.evaluations, {
    cascade: true
  })
  @JoinTable({
    name: 'evaluation_media_link',
    joinColumn: { name: 'evaluation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_id', referencedColumnName: 'id' }
  })
  mediaFiles: Media[];

  // --- DADOS GERAIS ---

  @CreateDateColumn({ name: 'evaluation_date' })
  evaluationDate: Date;

  @Column({ name: 'general_observations', type: 'text', nullable: true })
  generalObservations: string;

  // --- 1. AVALIAÇÃO DENTÁRIA (Q&A - Critérios Objetivos) ---

  // 1. Presença (True = Presente / False = Ausente)
  @Column({ name: 'tooth_presence', default: true })
  toothPresence: boolean;

  // 2. Fratura (0-5)
  @Column({ name: 'tooth_fracture', type: 'int', default: 0 })
  toothFracture: number;

  // 3. Redução de Coroa (0-5)
  @Column({ name: 'crown_reduction', type: 'int', default: 0 })
  crownReduction: number;

  // 4. Bordo Vitrificado (0-5)
  @Column({ name: 'vitrified_border', type: 'int', default: 0 })
  vitrifiedBorder: number;

  // 5. Desgaste Lingual (0-5)
  @Column({ name: 'lingual_wear', type: 'int', default: 0 })
  lingualWear: number;

  // 6. Pulpite (0-5)
  @Column({ name: 'pulpitis', type: 'int', default: 0 })
  pulpitis: number;

  // 7. Exposição Câmara Pulpar (0-5)
  @Column({ name: 'pulp_chamber_exposure', type: 'int', default: 0 })
  pulpChamberExposure: number;

  // 8. Cálculo Dentário (0-5)
  @Column({ name: 'dental_calculus', type: 'int', default: 0 })
  dentalCalculus: number;

  // 9. Coloração Anormal (0-5)
  @Column({ name: 'abnormal_color', type: 'int', default: 0 })
  abnormalColor: number;

  // 10. Cárie (0-5)
  @Column({ name: 'caries', type: 'int', default: 0 })
  caries: number;

  // --- 2. SAÚDE PERIODONTAL (Critérios Subjetivos/Mensuráveis) ---

  // 11. Recessão Gengival (0-5) - Alterado de float para int (escala de severidade ou mm convertido)
  @Column({ name: 'gingival_recession', type: 'int', default: 0 })
  gingivalRecession: number;

  // 12. Lesões Periodontais (0-5)
  @Column({ name: 'periodontal_lesions', type: 'int', default: 0 })
  periodontalLesions: number;

  // 13. Gengivite - Edema (0-5)
  @Column({ name: 'gingivitis_edema', type: 'int', default: 0 })
  gingivitisEdema: number;

  // 14. Gengivite - Coloração (0-5)
  @Column({ name: 'gingivitis_color', type: 'int', default: 0 })
  gingivitisColor: number;
}