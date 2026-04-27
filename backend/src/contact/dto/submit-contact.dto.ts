import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { SanitizeString } from '../../common/transformers/sanitize-string.transformer';

export class SubmitContactDto {
  @SanitizeString()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @IsEmail()
  email!: string;

  @SanitizeString()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject!: string;

  @SanitizeString()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  message!: string;
}
