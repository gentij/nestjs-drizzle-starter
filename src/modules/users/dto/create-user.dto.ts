import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsString()
  @Length(0, 50)
  first_name: string;

  @ApiProperty()
  @IsString()
  @Length(0, 50)
  last_name: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(0, 50)
  @IsOptional()
  username?: string;
}
