import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { UsersLogInDto, UsersSignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: UsersSignUpDto) {
    const accessToken = await this.authService.signUp(dto);

    return accessToken;
  }

  @Post('log-in')
  async logIn(@Body() dto: UsersLogInDto) {
    const accessToken = await this.authService.logIn(dto);

    return accessToken;
  }

  @Get('refresh-token')
  @LoggedInOnly()
  async refreshToken(@DUser() user: User) {
    const accessToken = await this.authService.refreshToken(user);

    return accessToken;
  }
}
