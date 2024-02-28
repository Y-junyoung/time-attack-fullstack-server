import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
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
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 20,
      // domain: '',
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
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 20,
      // domain: '',
    });

    return accessToken;
  }

  @Delete('log-out')
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      // domain: '',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    response.json();
  }

  @Get('refresh-token')
  @LoggedInOnly()
  async refreshToken(
    @DUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.refreshToken(user);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 20,
      // domain: '',
    });

    return accessToken;
  }
}
