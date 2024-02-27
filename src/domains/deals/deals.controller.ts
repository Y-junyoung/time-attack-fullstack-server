import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { PostDealDTO, UpdateDealDTO } from './deals.dto';
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

  @Delete(':dealId')
  @LoggedInOnly()
  removeDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    return this.dealsService.removeDeal(user, dealId);
  }

  @Patch(':dealId')
  @LoggedInOnly()
  updateDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
    @Body() dto: UpdateDealDTO,
  ) {
    return this.dealsService.updateDeal(user, dealId, dto);
  }
}
