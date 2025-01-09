import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResendDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;
}
