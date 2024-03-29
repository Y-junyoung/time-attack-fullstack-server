import { Prisma } from '@prisma/client';

export type PostDealDTO = {
  id?: number;
  title: string;
  content: string;
  location: string;
  price: number;
  imgSrc?: string;
  sellerId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  interested?: Prisma.InterestedDealUncheckedCreateNestedManyWithoutDealInput;
};

export type UpdateDealDTO = PostDealDTO;

export type UploadImageDTO = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
