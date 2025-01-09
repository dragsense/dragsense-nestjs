import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { UsersService } from 'src/v1/users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    try {
      let { id, emails, displayName, bio, avatar_url } = profile;
      const nameParts = displayName.split(' ');

      let email = `github-${id}@email.com`;

      if (!emails && Array.isArray(emails) && emails.length > 0) {
        email = emails.find((e: any) => e.primary)?.email || emails[0].email;
      }

      let user = await this.usersService.findOneByIdentifier(id);

      if (!user) {
        user = await this.usersService.register(
          {
            email,
            firstname: nameParts[0] || '',
            lastname: nameParts[1] || nameParts[0],
            bio,
            thumbnail: avatar_url,
            identifier: id,
            emailVerified: true,
            password: null,
          },
          true,
        );
      }

      done(null, user);
    } catch (error) {
      console.error('Error validating OAuth user:', error);
      done(error, null);
    }
  }
}
