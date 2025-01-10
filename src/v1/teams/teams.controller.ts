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
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/gaurds/jwt-auth.guard';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.teamsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getAllByUser(@Request() req: any) {
    const userId = req.user.userId;

    return await this.teamsService.findTeamsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.teamsService.findOneByID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req: any, @Body() createTeamDto: CreateTeamDto) {
    const userId = req.user.userId;

    const project = await this.teamsService.create(createTeamDto, userId);
    return { message: 'Team created successfully', project };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/:id')
  async udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    const project = await this.teamsService.update(id, updateTeamDto);
    return { message: 'Team updated successfully', project };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.teamsService.delete(id);
    return { message: 'Team deleted successfully' };
  }
}
