import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 255)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6, 100)
  readonly password: string;
}
