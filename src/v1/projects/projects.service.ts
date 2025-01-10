import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Repository } from 'typeorm';
import { UserProject } from 'src/entities/user-projects.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(UserProject)
    private readonly userProjectRepository: Repository<UserProject>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findProjectsByUserId(userId: number): Promise<Project[]> {
    const userProjects = await this.userProjectRepository.find({
      where: { user: { id: userId } },
      relations: ['project'],
    });

    return userProjects.map((userProject) => userProject.project);
  }

  async findOneByIdentifier(identifier: string): Promise<Project | null> {
    return this.projectRepository.findOne({ where: { identifier } });
  }

  async findOneByID(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async create(
    createProjectrDto: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const { name, desc, serverUrl, apiPrefix, apiVer, identifier } =
      createProjectrDto;

    const existingProject = await this.findOneByIdentifier(identifier);
    if (existingProject) {
      throw new ConflictException('Project already exists');
    }

    const newProject = this.projectRepository.create({
      name,
      desc,
      serverUrl,
      apiPrefix,
      apiVer,
      identifier,
    });

    const savedProject = await this.projectRepository.save(newProject);

    const userProject = this.userProjectRepository.create({
      user: { id: userId },
      project: savedProject,
    });

    await this.userProjectRepository.save(userProject);

    return savedProject;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const { name, desc, serverUrl, apiPrefix, apiVer, identifier } =
      updateProjectDto;

    const project = await this.findOneByID(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    project.name = name;
    project.desc = desc;
    project.serverUrl = serverUrl;
    project.apiPrefix = apiPrefix;
    project.apiVer = apiVer;
    project.identifier = identifier;

    return await this.projectRepository.save(project);
  }

  async delete(id: number): Promise<void> {

    const project = await this.findOneByID(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    await this.projectRepository.remove(project);
  }
}
