import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { UserTeam } from 'src/entities/user-teams.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(UserTeam)
    private userTeamRepository: Repository<UserTeam>,
    //@InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService
  ) {}

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async findTeamsByUserId(userId: number): Promise<Team[]> {
    const userProjects = await this.userTeamRepository.find({
      where: { user: { id: userId } },
      relations: ['team'],
    });

    return userProjects.map((userTeam) => userTeam.team);
  }

  async findOneByID(id: number): Promise<Team | null> {
    return this.teamRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Team | null> {
    return this.teamRepository.findOne({ where: { name } });
  }

  async create(createTeamDto: CreateTeamDto, userId: number): Promise<Team> {
    const { name, desc } = createTeamDto;

    const existingTeam = await this.findByName(name);
    if (existingTeam) {
      throw new ConflictException('Team already exists with this name');
    }

    const newTeam = this.teamRepository.create({
      name,
      desc,
    });

    const savedTeam = await this.teamRepository.save(newTeam);

    const userTeam = this.userTeamRepository.create({
      user: { id: userId },
      team: savedTeam,
    });

    await this.userTeamRepository.save(userTeam);

    return savedTeam;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const { name, desc } = updateTeamDto;

    const team = await this.findOneByID(id);
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }

    team.name = name;
    team.desc = desc;

    return await this.teamRepository.save(team);
  }

  async delete(id: number): Promise<void> {

    const team = await this.findOneByID(id);
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }

    await this.teamRepository.remove(team);
  
  }
}
