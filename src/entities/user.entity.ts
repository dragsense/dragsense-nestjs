import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Table name
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | null;

  @Column({ type: 'varchar', unique: true, nullable: true })
  identifier: string | null;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  verifiedEmail: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  firstname: string | null;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isEmailPublic: boolean;
}
