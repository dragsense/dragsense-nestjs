import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './gaurds/jwt-auth.guard';
import { GoogleAuthGuard } from './gaurds/google-auth.gaurd';
import { GithubAuthGuard } from './gaurds/github-auth.gaurd';
import { Response } from 'express';
import { ForgotDto } from './dtos/forgot.dto';
import { ResendDto } from './dtos/resend.dto';
import { ResetDto } from './dtos/reset.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { VerifyDto } from './dtos/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { email, password } = loginDto;

    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const auth = await this.authService.login(user);

    res.cookie('access_token', auth.access_token, auth.cookieOptions);

    return res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  @Post('forgot')
  async forgotPassword(@Body() forgotDto: ForgotDto) {
    const { email } = forgotDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.authService.generateResetToken(user);

    return { message: 'Password reset email sent' };
  }

  @Post('reset')
  async resetPassword(@Body() resetDto: ResetDto) {
    const { token, password } = resetDto;

    const userId = await this.authService.validateResetToken(token);

    if (userId) this.usersService.updatePassword(userId, password);
    else
      throw new HttpException(
        'Invalid or expired reset token',
        HttpStatus.BAD_REQUEST,
      );

    return { message: 'Password reset successful' };
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    const FRONTEND_APP_URL = this.configService.get<string>('FRONTEND_APP_URL');

    if (!token) {
      return res.redirect(
        `${FRONTEND_APP_URL}/admin?status=error&code=400&message=Token is required.`,
      );
    }

    const userId =
      await this.usersService.validateEmailVarificationToken(token);

    if (!userId) {
      return res.redirect(
        `${FRONTEND_APP_URL}/admin?status=error&code=400&message=Invalid or expired reset token.`,
      );
    }

    try {
      await this.usersService.updateEmail(userId);
    } catch (error) {
      return res.redirect(
        `${FRONTEND_APP_URL}/admin?status=error&code=500&message=Failed to verify email. Please try again later.`,
      );
    }

    return res.redirect(
      `${FRONTEND_APP_URL}/admin?status=success&code=200&message=Email verified successfully.`,
    );
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Request() req: any, @Res() res: Response) {
    const FRONTEND_APP_URL = this.configService.get<string>('FRONTEND_APP_URL');

    if (req.user) {
      return res.redirect(
        `${FRONTEND_APP_URL}/auth/login?error=Somehing went wrong.`,
      );
    }

    const auth = await this.authService.login(req.user);

    res.cookie('access_token', auth.access_token, auth.cookieOptions);

    return res.redirect(
      `${FRONTEND_APP_URL}/admin?message=Google login successful.`,
    );
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  async githubLogin() {
    // Redirects to GitHub
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Request() req: any, @Res() res: Response) {
    const FRONTEND_APP_URL = this.configService.get<string>('FRONTEND_APP_URL');

    if (!req.user) {
      return res.redirect(
        `${FRONTEND_APP_URL}/auth/login?error=Somehing went wrong.`,
      );
    }

    const auth = await this.authService.login(req.user);

    res.cookie('access_token', auth.access_token, auth.cookieOptions);

    return res.redirect(
      `${FRONTEND_APP_URL}/admin?message=GitHub login successful.`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('resend')
  async resendVerificationEmail(@Request() req: any) {
    const userId = req.user.userId;
    const user = await this.usersService.findOneByID(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.usersService.sendVerificationEmail(user, user.email);

    return { message: 'Verification email sent' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any, @Res() res: Response) {
    const userId = req.user.userId;
    await this.authService.logout(userId);
    res.cookie('access_token', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(),
      path: '/',
    });

    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }
}
