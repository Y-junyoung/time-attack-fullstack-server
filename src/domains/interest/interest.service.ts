import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class InterestService {
  constructor(private readonly prismaService: PrismaService) {}

  async addInterestedDeal(userId: number, dealId: number) {
    if (!dealId) throw new BadRequestException('No deal');

    const interestedDeal = await this.prismaService.interestedDeal.create({
      data: { interestId: userId, dealId },
    });

    return interestedDeal;
  }

  async removeInterestedDeal(userId: number, dealId: number) {
    if (!dealId) throw new BadRequestException('No deal');

    const interestedDeal = await this.prismaService.interestedDeal.delete({
      where: { interestId_dealId: { interestId: userId, dealId } },
    });

    return interestedDeal;
  }
}
