import {
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @Length(0, 1024, { message: 'Bio must be at most 1024 characters long.' })
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Thumbnail must be a valid URL.' })
  thumbnail?: string;
}
