import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity'; 

@Entity()
export class RevokedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' }) 
  @JoinColumn()
  user: User;

@Column({ type: 'enum', enum: ['LoggedOut', 'Active'] })
  token_status: 'LoggedOut' | 'Active';


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date; 

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
