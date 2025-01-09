import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { UserController } from './users.controller';
import { Profile } from '../../entities/profile.entity';
import { EmailService } from 'src/shared/email/email.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), JwtModule],
  providers: [UsersService, EmailService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
