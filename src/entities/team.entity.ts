import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamProject } from './team-projects.entity';
import { UserTeam } from './user-teams.entity';

@Entity('teams') // Table name
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  desc: string;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  userTeams: UserTeam[];

  @OneToMany(() => TeamProject, (teamProject) => teamProject.team)
  teamProjects: TeamProject[];
}
