import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class InterestService {
  constructor(private readonly prismaService: PrismaService) {}

  async addInterestedDeal(userId: string, dealId: number) {
    if (!dealId) throw new BadRequestException('No deal');

    const interestedDeal = await this.prismaService.interestedDeal.create({
      data: { userId, dealId },
    });

    return interestedDeal;
  }

  async removeInterestedDeal(userId: string, dealId: number) {
    if (!dealId) throw new BadRequestException('No deal');

    const interestedDeal = await this.prismaService.interestedDeal.delete({
      where: { userId_dealId: { userId, dealId } },
    });

    return interestedDeal;
  }
}
