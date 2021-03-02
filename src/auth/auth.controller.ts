import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(@Res() res: Response, @Body() body: RegisterUserDto) {
    const resp = await this.authService.registerUser(body);
    return res.status(201).json(resp);
  }

  @Put('/user/:id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    const resp = await this.authService.updateUser(id, body);
    return resp;
  }

  @Delete('/user/:id')
  async deleteUser(@Res() res: Response, @Param('id') id: number) {
    await this.authService.deleteUser(id);
    return res.status(204).send();
  }
}
