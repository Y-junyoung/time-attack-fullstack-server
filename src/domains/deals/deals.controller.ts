import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
    return this.dealsService.getDeal(dealId);
  }
}
