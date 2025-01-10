import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { UserTeam } from 'src/entities/user-teams.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Team, UserTeam])],
  providers: [TeamsService],

  controllers: [TeamsController],
})
export class TeamsModule {}
