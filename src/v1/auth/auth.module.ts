import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { GithubStrategy } from './passport-strategies/github.strategy';
import { GoogleStrategy } from './passport-strategies/google.strategy';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { RevokedToken } from 'src/entities/revoked_tokens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/shared/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RevokedToken]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [
    AuthService,
    EmailService,
    LocalStrategy,
    JwtStrategy,
    GithubStrategy,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
