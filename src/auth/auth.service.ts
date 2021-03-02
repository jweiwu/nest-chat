import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/User';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async registerUser(user: RegisterUserDto) {
    return await this.userRepo.save(user);
  }

  async updateUser(id: number, user: UpdateUserDto) {
    return await this.userRepo.update(id, user);
  }

  async deleteUser(id: number) {
    return await this.userRepo.softDelete(id);
  }
}
