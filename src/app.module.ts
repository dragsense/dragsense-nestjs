import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { UsersModule } from './v1/users/users.module';
import { User } from './entities/user.entity';
import { RevokedToken } from './entities/revoked_tokens.entity';
import { EmailService } from './shared/email/email.service';
import { Profile } from './entities/profile.entity';
import { ProjectsController } from './v1/projects/projects.controller';
import { ProjectsService } from './v1/projects/projects.service';
import { ProjectsModule } from './v1/projects/projects.module';
import { UserProject } from './entities/user-projects.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as
          | 'postgres'
          | 'mysql'
          | 'sqlite',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Profile, RevokedToken, UserProject, Project],
        synchronize: true, // Use true only in development
      }),
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
