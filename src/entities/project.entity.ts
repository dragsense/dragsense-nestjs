import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { UserProject } from './user-projects.entity';

@Entity('projects') // Table name
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  userProjects: UserProject[];

  @Column({ type: 'varchar', length: 100, unique: true })
  identifier: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  desc: string;

  @Column({ type: 'varchar', length: 200 })
  serverUrl: string;

  @Column({ type: 'varchar', length: 30, default: 'api' })
  apiPrefix: string;

  @Column({ type: 'varchar', length: 10, default: 'v1' })
  apiVer: string;

  @Column({ type: 'varchar', length: 10, default: 'nodejs' })
  platform: string;
}
