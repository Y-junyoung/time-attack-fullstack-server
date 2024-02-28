import { Body, Controller, Post } from '@nestjs/common';
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
}
