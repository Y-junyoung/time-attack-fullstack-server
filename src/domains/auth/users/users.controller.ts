import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { UsersLogInDto, UsersSignUpDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() dto: UsersSignUpDto) {
    const accessToken = await this.usersService.signUp(dto);

    return accessToken;
  }

  @Post('log-in')
  async logIn(@Body() dto: UsersLogInDto) {
    const accessToken = await this.usersService.logIn(dto);

    return accessToken;
  }

  @Get('written')
  @LoggedInOnly()
  async getWrittenDeal(@DUser() user: User) {
    return await this.usersService.getWrittenDeal(user);
  }

  @Get('interest')
  @LoggedInOnly()
  async getInterestDeal(@DUser() user: User) {
    return await this.usersService.getInterests(user);
  }
}
