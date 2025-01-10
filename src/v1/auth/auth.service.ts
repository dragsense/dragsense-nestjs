import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevokedToken } from '../../entities/revoked-tokens.entity';
import { EmailService } from 'src/shared/email/email.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    @InjectRepository(RevokedToken)
    private readonly revokedTokenRepository: Repository<RevokedToken>,
  ) {}

 

  async login(user: any) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    await this.revokedTokenRepository.upsert(
      {
        user: user,
        token_status: 'Active',
      },
      { conflictPaths: ['user'] },
    );

    const NODE_ENV = this.configService.get<string>('FRONTEND_APP_URL');

    return {
      access_token: token,
      cookieOptions: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'lax' as 'lax',
        expires: new Date(new Date().getTime() + 3600 * 1000),
        path: '/',
      },
    };
  }

  async generateResetToken(user: User): Promise<boolean> {
 
    const RESET_PASSWORD_SECRET = this.configService.get<string>(
      'RESET_PASSWORD_SECRET',
    );

    const resetToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '1h', secret: RESET_PASSWORD_SECRET },
    );

    const FRONTEND_APP_URL = this.configService.get<string>('FRONTEND_APP_URL');
    const WEBSITE_URL = this.configService.get<string>('WEBSITE_URL');

    const resetLink = `${FRONTEND_APP_URL}/auth/reset?token=${resetToken}`;

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              padding: 20px;
            }
            .email-container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 30px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            p {
              font-size: 16px;
              line-height: 1.6;
            }
            .button {
              background-color: #f88a24;
              color: #ffffff;
              padding: 12px 20px;
              border-radius: 5px;
              text-decoration: none;
              font-size: 16px;
              display: inline-block;
              margin-top: 20px;
            }
               .button:hover {
              background-color: #f77d0b;
              
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h1>Password Reset Request</h1>
            <p>Hello ${user.firstname},</p>
            <p>We received a request to reset your password. To complete the process, please click the link below:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
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
      to: user.email,
      subject: 'DragSense - Password Reset Request',
      text: `Click the link to reset your password: ${resetLink}`, // Fallback text version
      html: htmlContent, // HTML version of the email
    });
    return true;
  }

  async validateResetToken(token: string): Promise<number | null> {
    try {
      const RESET_PASSWORD_SECRET = this.configService.get<string>(
        'RESET_PASSWORD_SECRET',
      );

      const payload = this.jwtService.verify(token, {
        secret: RESET_PASSWORD_SECRET,
      });
      return payload.sub;
    } catch (error) {
      return null;
    }
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

}
