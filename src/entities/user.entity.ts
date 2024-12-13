import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Table name
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string | null;

  @Column({ unique: true })
  email: string;

  @Column()
  firstname: string | null;

  @Column()
  lastname: string;
}
