import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '../database/entities/user';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userDto: RegisterUserDto): Promise<User> {
    return await this.usersService.createUser(userDto);
  }

  async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.usersService.findUserByEmail(userDto.email);
    if (!user) {
      return;
    }

    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) {
      return;
    }

    return user;
  }

  login(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
