import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column() 
  password: string;

  @Column({ default: 'user' })
  role: string; // 'admin' ou 'user'

  @CreateDateColumn({ name: 'registration_date' })
  registrationDate: Date;
}