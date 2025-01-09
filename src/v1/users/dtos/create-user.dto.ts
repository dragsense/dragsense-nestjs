import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string | null;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  identifier?: string | null;

  @IsString()
  @IsOptional()
  firstname: string | null;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean = false;

  @IsBoolean()
  @IsOptional()
  isEmailPublic: boolean = false;
}
