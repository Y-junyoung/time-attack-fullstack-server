import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { DUser } from 'src/decorators/user.decorator';
import { UsersLogInDto, UsersSignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() dto: UsersSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.signUp(dto);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 20,
      domain:
        'port-0-time-attack-fullstack-server-17xco2lltdolap1.sel5.cloudtype.app',
    });

    return accessToken;
  }

  @Post('log-in')
  async logIn(
    @Body() dto: UsersLogInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.logIn(dto);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 20,
      domain:
        'port-0-time-attack-fullstack-server-17xco2lltdolap1.sel5.cloudtype.app',
    });

    return accessToken;
  }

  @Delete('log-out')
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain:
        'port-0-time-attack-fullstack-server-17xco2lltdolap1.sel5.cloudtype.app',
    });

    response.json();
  }

  @Get('refresh-token')
  async refreshToken(
    @DUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!user) return;

    const accessToken = await this.authService.refreshToken(user);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 20,
      domain:
        'port-0-time-attack-fullstack-server-17xco2lltdolap1.sel5.cloudtype.app',
    });

    return accessToken;
  }
}
