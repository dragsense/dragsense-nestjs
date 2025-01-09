import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @MaxLength(100, { message: 'name must not exceed 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'identifier must be at least 3 characters long' })
  @MaxLength(100, { message: 'identifier must not exceed 100 characters' })
  identifier: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'description must be at least 3 characters long' })
  @MaxLength(1024, { message: 'description must not exceed 1024 characters' })
  desc: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'server URL must be a URL address' })
  serverUrl: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'api prefix must be at least 3 characters long' })
  @MaxLength(30, { message: 'api prefix must not exceed 30 characters' })
  apiPrefix: string;

  @IsString()
  @IsNotEmpty()
  apiVer: string;
}
