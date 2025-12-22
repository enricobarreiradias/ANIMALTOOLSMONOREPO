import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user') 
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' }) 
  fullName: string;

  @Column()
  email: string;

  @CreateDateColumn({ name: 'registration_date' })
  registrationDate: Date;
}