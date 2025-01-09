import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/gaurds/jwt-auth.guard';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.projectsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getAllByUser(@Request() req: any) {
    const userId = req.user.userId;

    return await this.projectsService.findProjectsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.findOneByID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Request() req: any,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const userId = req.user.userId;

    const project = await this.projectsService.create(createProjectDto, userId);
    return { message: 'Project created successfully', project };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/:id')
  async udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectrDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.update(id, updateProjectrDto);
    return { message: 'Project updated successfully', project };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.projectsService.delete(id);
    return { message: 'Project deleted successfully' };
  }
}
