import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @MaxLength(100, { message: 'name must not exceed 100 characters' })
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'description must be at least 3 characters long' })
  @MaxLength(1024, { message: 'description must not exceed 1024 characters' })
  desc: string;
}
