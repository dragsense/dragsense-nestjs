import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_HOST_PORT'),
      auth: {
        user: this.configService.get<string>('EMAIL_HOST_USER'),
        pass: this.configService.get<string>('EMAIL_HOST_PASS'),
      },
    });
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    await this.transporter.sendMail({
      from: `"No Reply" <${this.configService.get<string>('EMAIL_FROM')}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }
}
