import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  firstname: string | null;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}
