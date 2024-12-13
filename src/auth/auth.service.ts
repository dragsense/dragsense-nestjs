import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevokedToken } from '../entities/revoked_tokens.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(RevokedToken)
    private readonly revokedTokenRepository: Repository<RevokedToken>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.validateUser(email, password);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    await this.revokedTokenRepository.upsert(
      {
        user: user,
        token_status: 'Active',
      },
      { conflictPaths: ['user'] },
    );

    return {
      access_token: token,
    };
  }

  async logout(userId: number) {
    await this.revokedTokenRepository.upsert(
      {
        user: { id: userId },
        token_status: 'LoggedOut',
      },
      { conflictPaths: ['user'] },
    );
  }

  async checkTokenStatus(userId: number): Promise<boolean> {
    const revokedToken = await this.revokedTokenRepository.findOne({
      where: { user: { id: userId } },
    });

    if (revokedToken && revokedToken.token_status === 'Active') {
      return true;
    }

    return false;
  }

  async validateOAuthUser(
    email: string,
    firstname: string,
    lastname: string,
  ): Promise<any> {
    let user = await this.usersService.findOneByEmail(email);

    if (!user) {
      user = await this.usersService.register(
        {
          password: null,
          email,
          firstname,
          lastname,
        },
        true,
      );
    }

    return user;
  }
}
