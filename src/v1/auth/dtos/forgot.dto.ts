import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;
}
