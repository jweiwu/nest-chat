import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const hash = await bcrypt.hash(userDto.password, 10);
    return await this.userRepo.save({ ...userDto, password: hash });
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOne({ email });
  }
}
