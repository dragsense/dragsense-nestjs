import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Profile } from '../../entities/profile.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/shared/email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findProfileByUserId(userId: number): Promise<Profile | null> {
    return this.profileRepository.findOne({ where: { user: { id: userId } } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { verifiedEmail: email } });
  }

  async findOneByIdentifier(identifier: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { identifier } });
  }

  async findOneByID(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
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

  async updateEmail(userId: number): Promise<void> {
    const user = await this.findOneByID(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.verifiedEmail = user.email;
    user.emailVerified = true;

    await this.userRepository.save(user);

    const otherUsers = await this.userRepository.find({
      where: { email: user.email, id: Not(user.id) },
    });

    if (otherUsers.length > 0) {
      await this.userRepository.remove(otherUsers);
    }
  }

  async sendVerificationEmail(user: any, email: string) {
    const APP_URL = this.configService.get<string>('APP_URL');
    const WEBSITE_URL = this.configService.get<string>('WEBSITE_URL');

    const VERIFY_SECRET = this.configService.get<string>('VERIFY_SECRET');

    const verifyToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '1h', secret: VERIFY_SECRET },
    );

    const verificationLink = `${APP_URL}/v1/api/auth/verify?token=${verifyToken}`;

    const htmlContent = `
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; }
      .email-container { background-color: #ffffff; border-radius: 8px; padding: 30px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
      .button { background-color: #4CAF50; color: #ffffff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; display: inline-block; margin-top: 20px; }
      .button:hover { background-color: #45a049; }
      .footer { margin-top: 30px; font-size: 14px; color: #777; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h1>Email Verification</h1>
      <p>Hello ${user.firstname},</p>
      <p>Thank you for registering with DragSense. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}" class="button">Verify Email</a>
      <p>If you did not register, please ignore this email.</p>
      <div class="footer">
        <p>Regards,</p>
        <p>The DragSense Team</p>
        <p><a href="${WEBSITE_URL}" target="_blank">Visit our website</a></p>
      </div>
    </div>
  </body>
</html>
`;

    await this.emailService.sendEmail({
      to: email,
      subject: 'DragSense - Email Verification',
      text: `Click the link to verify your email: ${verificationLink}`, // Fallback text version
      html: htmlContent, // HTML version
    });
  }

  async validateEmailVarificationToken(token: string): Promise<number | null> {
    try {
      const VERIFY_SECRET = this.configService.get<string>('VERIFY_SECRET');

      const payload = this.jwtService.verify(token, {
        secret: VERIFY_SECRET,
      });
      return payload.sub;
    } catch (error) {
      return null;
    }
  }

  async register(
    createUserDto: CreateUserDto | CreateProfileDto,
    isOAuthRequest: boolean = false,
  ): Promise<User> {
    const {
      firstname,
      lastname,
      password,
      email,
      emailVerified = false,
      identifier = null,
    } = createUserDto as CreateUserDto;

    if (!password && !isOAuthRequest) {
      throw new BadRequestException(
        'Password is required for traditional registration',
      );
    }

    if (!identifier && isOAuthRequest) {
      throw new BadRequestException('Something went wrong');
    }

    const existingUser = await this.userRepository.findOne({
      where: { verifiedEmail: email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const newUser = this.userRepository.create({
      password: hashedPassword,
      email,
      firstname,
      lastname,
      emailVerified,
      identifier,
    });

    const user = await this.userRepository.save(newUser);

    const { thumbnail, bio } = createUserDto as CreateProfileDto;

    const profile = this.profileRepository.create({
      user: { id: user.id },
      thumbnail,
      bio,
    });

    await this.profileRepository.save(profile);

    if (!isOAuthRequest) {
      await this.sendVerificationEmail(user, email);
    }

    return user;
  }

  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto | UpdateUserDto,
  ): Promise<boolean> {
    const { email, firstname, lastname } = updateProfileDto as UpdateUserDto;

    const {
      thumbnail,
      bio,
      website,
      location,
      github,
      x,
      linkedin,
      dateOfBirth,
      phone,
      themeMode,
    } = updateProfileDto as UpdateProfileDto;

    const currentUser = await this.findOneByID(userId);

    if (!currentUser) {
      throw new Error('User not found');
    }

    const isEmailChanged = email !== currentUser.verifiedEmail;

    if (isEmailChanged) {
      const existingUser = await this.findOneByEmail(email);

      if (existingUser) {
        throw new Error('The email is already taken');
      }

      await this.sendVerificationEmail(currentUser, email);
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.getRepository(User).update(userId, {
        email,
        firstname,
        lastname,
        ...(isEmailChanged
          ? { emailVerified: false }
          : { emailVerified: true }),
      });

      await manager.getRepository(Profile).update(
        { user: { id: userId } },
        {
          thumbnail,
          bio,
          website,
          location,
          github,
          x,
          linkedin,
          dateOfBirth,
          phone,
          themeMode,
        },
      );
    });

    return isEmailChanged;
  }

  async updatePassword(userId: number, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.update(userId, { password: hashedPassword });
  }
}
