import { Injectable } from '@nestjs/common';
import { Deal, User } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { PostDealDTO, UpdateDealDTO, UploadImageDTO } from './deals.dto';

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

  async incrementViews(dealId: number): Promise<Deal> {
    const deal = await this.prismaService.deal.update({
      where: { id: dealId },
      data: { views: { increment: 1 } },
    });
    return deal;
  }

  async postDeal(dto: PostDealDTO, user: User) {
    const { title, content, location, price, imgSrc } = dto;
    const { email } = user;
    const deal = await this.prismaService.deal.create({
      data: { title, content, location, price, sellerId: email, imgSrc },
    });

    return deal;
  }

  async uploadImage(dto: UploadImageDTO) {
    const basePath = join(__dirname, '../../../public/images');
    const fileNameBase = nanoid();
    const fileExtension = dto.originalname.split('.').pop();
    const fileName = `${fileNameBase}.${fileExtension}`;
    const path = join(basePath, fileName);

    await writeFile(path, dto.buffer);

    return fileName;
  }

  async removeDeal(user: User, dealId: number) {
    const { email } = user;
    const removedDeal = await this.prismaService.deal.delete({
      where: { id: dealId, sellerId: email },
    });

    return removedDeal;
  }

  async updateDeal(user: User, dealId: number, dto: UpdateDealDTO) {
    const { title, content, location, price, imgSrc } = dto;
    const { email } = user;
    const UpdatedDeal = await this.prismaService.deal.update({
      where: { id: dealId, sellerId: email },
      data: { title, content, location, price, imgSrc, sellerId: email },
    });

    return UpdatedDeal;
  }
}
