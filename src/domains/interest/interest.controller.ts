import { Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { InterestService } from './interest.service';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post('deals/:dealId')
  @LoggedInOnly()
  addInterestedDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    return this.interestService.addInterestedDeal(user, dealId);
  }

  @Delete('deals/:dealId')
  @LoggedInOnly()
  removeInterestedDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    return this.interestService.removeInterestedDeal(user, dealId);
  }
}
