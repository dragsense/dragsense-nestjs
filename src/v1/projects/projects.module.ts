import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UserProject } from 'src/entities/user-projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, UserProject])],
  providers: [ProjectsService],
  
  controllers: [ProjectsController],
})
export class ProjectsModule {}
