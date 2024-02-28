import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('written')
  @LoggedInOnly()
  async getWrittenDeals(@DUser() user: User) {
    return await this.usersService.getWrittenDeals(user);
  }

  @Get('interest')
  @LoggedInOnly()
  async getInterests(@DUser() user: User) {
    return await this.usersService.getInterests(user);
  }

  @Get()
  @LoggedInOnly()
  async getUser(@DUser() user: User) {
    return await this.usersService.getUser(user.email);
  }
}
