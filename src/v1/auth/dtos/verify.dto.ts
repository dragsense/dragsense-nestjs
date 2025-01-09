import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyDto {
  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;

}
