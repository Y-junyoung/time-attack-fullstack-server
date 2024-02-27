import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { PostDealDTO } from './deals.dto';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getDeals() {
    const deals = await this.prismaService.deal.findMany({
      include: { _count: { select: { interested: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return deals;
  }

  async getDeal(dealId: number) {
    const deal = await this.prismaService.deal.findUnique({
      where: { id: dealId },
      include: { _count: { select: { interested: true } } },
    });

    return deal;
  }

  async postDeal(dto: PostDealDTO, user: User) {
    const { title, content, location, price } = dto;
    const { email } = user;
    const deal = await this.prismaService.deal.create({
      data: { title, content, location, price, sellerId: email },
    });

    return deal;
  }
}
