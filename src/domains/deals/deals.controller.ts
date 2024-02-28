import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
  async getDeals() {
    return await this.dealsService.getDeals();
  }

  @Get(':dealId')
  async getDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    const deal = await this.dealsService.getDeal(dealId);

    await this.dealsService.incrementViews(dealId);

    return deal;
  }

  @Post('create')
  @LoggedInOnly()
  async postDeal(@DUser() user: User, @Body() dto: PostDealDTO) {
    return await this.dealsService.postDeal(dto, user);
  }

  @Delete(':dealId')
  @LoggedInOnly()
  async removeDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    return await this.dealsService.removeDeal(user, dealId);
  }

  @Put(':dealId')
  @LoggedInOnly()
  async updateDeal(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
    @Body() dto: UpdateDealDTO,
  ) {
    return await this.dealsService.updateDeal(user, dealId, dto);
  }
}
