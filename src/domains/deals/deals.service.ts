import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}
  getDeals() {
    const deals = this.prismaService.deal.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return deals;
  }

  getDeal(dealId: number) {
    const deal = this.prismaService.deal.findUnique({ where: { id: dealId } });

    return deal;
  }
}
