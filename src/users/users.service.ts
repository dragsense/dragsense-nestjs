import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.findOneByEmail(email);

    if (user && user.password) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async register(
    createUserDto: CreateUserDto,
    isOAuthRequest: boolean = false,
  ): Promise<User> {
    const { firstname, lastname, password, email } = createUserDto;

    if (!password && !isOAuthRequest) {
      throw new BadRequestException(
        'Password is required for traditional registration',
      );
    }

    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const newUser = this.userRepository.create({
      password: hashedPassword,
      email,
      firstname,
      lastname,
    });

    return this.userRepository.save(newUser);
  }
}
