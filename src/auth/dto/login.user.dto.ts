import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6, 100)
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
