import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../database/entities/user';
import { LoginUserDto } from './dto/login.user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const userDto = new LoginUserDto(email, password);
    const user = await this.authService.validateUser(userDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
