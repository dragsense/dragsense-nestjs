import {
  IsOptional,
  IsString,
  IsUrl,
  IsDate,
  Length,
  Matches,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(0, 1024, { message: 'Bio must be at most 1024 characters long.' })
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Thumbnail must be a valid URL.' })
  thumbnail?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Website must be a valid URL.' })
  website?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100, { message: 'Location must be at most 100 characters long.' })
  location?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Github handle must be a valid URL.' })
  github?: string;

  @IsOptional()
  @IsUrl({}, { message: 'X handle must be a valid URL.' })
  x?: string;

  @IsOptional()
  @IsUrl({}, { message: 'LinkedIn profile must be a valid URL.' })
  linkedin?: string;

  @IsOptional()
  @IsDate({ message: 'Date of birth must be a valid date.' })
  dateOfBirth?: Date;

  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international number.',
  })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Theme must be a valid option (light or dark).' })
  themeMode?: 'light' | 'dark';
}
