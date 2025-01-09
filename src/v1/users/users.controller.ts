import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UnauthorizedException,
  ParseIntPipe,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { JwtAuthGuard } from '../auth/gaurds/jwt-auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateProfileDto } from './dtos/create-profile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.userId;
    const user = await this.usersService.findOneByID(userId);
    const profile = await this.usersService.findProfileByUserId(userId);

    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }

    return {
      user: { ...user, password: null },
      profile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async saveProfile(
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto | UpdateUserDto,
  ) {
    const userId = req.user.userId;
    const isEmailChanged =  await this.usersService.updateProfile(userId, updateProfileDto);

    return { message: isEmailChanged ? 'Email verification has been sent to your email. Please verify your email.' : '' };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto | CreateProfileDto) {
    const user = await this.usersService.register(createUserDto);
    return { message: 'User registered successfully', user };
  }
}
