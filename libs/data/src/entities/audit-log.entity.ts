import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string; // ex: 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'

  @Column()
  entity: string; // ex: 'User', 'Evaluation', 'Animal'

  @Column()
  entityId: string; // ID do item que foi mexido

  @Column({ type: 'text', nullable: true })
  details: string; // Detalhes extras (ex: "Mudou o cargo para Admin")

  // Relacionamento com o usuário que fez a ação
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}