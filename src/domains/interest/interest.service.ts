import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class InterestService {
  constructor(private readonly prismaService: PrismaService) {}

  async addInterestedDeal(user: User, dealId: number) {
    if (!dealId) throw new BadRequestException('No deal');

    const interest = await this.prismaService.interest.findUnique({
      where: { userId: user.email },
    });

    if (!interest) {
      await this.prismaService.interest.create({
        data: { userId: user.email },
      });
    }

    const interestedDeal = await this.prismaService.interestedDeal.create({
      data: { userId: user.email, dealId },
    });

    return interestedDeal;
  }

  async removeInterestedDeal(user: User, dealId: number) {
    if (!dealId) throw new BadRequestException('No deal');

    const interestedDeal = await this.prismaService.interestedDeal.delete({
      where: { userId_dealId: { userId: user.email, dealId } },
    });

    return interestedDeal;
  }
}
