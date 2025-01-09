import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ResetDto {
  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
