import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getWrittenDeals(user: User) {
    const { email } = user;
    const writtenDeals = await this.prismaService.user.findMany({
      where: { email },
      select: { myDeals: true },
    });

    return writtenDeals;
  }

  async getInterests(user: User) {
    const { email } = user;
    const interestDeals = await this.prismaService.user.findMany({
      where: { email },
      select: {
        interests: { select: { interestedDeals: { select: { deal: true } } } },
      },
    });

    return interestDeals;
  }
}
