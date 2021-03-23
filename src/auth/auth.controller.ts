import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Public } from '../core';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from '../database/entities/User';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    const resp = await this.authService.registerUser(body);
    return resp;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/login')
  login(@Req() req: Request, @Body() _: LoginUserDto, @Res() res: Response) {
    const resp = this.authService.login(req.user as User);
    return res.status(200).json({ accessToken: resp });
  }

  @ApiSecurity('bearer')
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
