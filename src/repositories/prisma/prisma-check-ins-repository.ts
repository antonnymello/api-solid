import { type Prisma, type CheckIn } from '@prisma/client';

export interface CheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>;
  findManyByUserId: (userId: string) => Promise<CheckIn[]>;
}