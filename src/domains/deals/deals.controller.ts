import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { PostDealDTO } from './deals.dto';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  getDeals() {
    return this.dealsService.getDeals();
  }

  @Get(':dealId')
  getDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    const deal = this.dealsService.getDeal(dealId);

    this.dealsService.incrementViews(dealId);

    return deal;
  }

  @Post('create')
  @LoggedInOnly()
  postDeal(@DUser() user: User, @Body() dto: PostDealDTO) {
    return this.dealsService.postDeal(dto, user);
  }
}
