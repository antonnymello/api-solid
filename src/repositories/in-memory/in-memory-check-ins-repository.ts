import { randomUUID } from 'node:crypto';
import { type CheckInsRepository } from '@/repositories/check-ins-repository';
import { type Prisma, type CheckIn } from '@prisma/client';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const checkIn = this.items.find(
      (item) =>
        item.id_user === userId &&
        item.created_at.getDate() === date.getDate() &&
        item.created_at.getMonth() === date.getMonth() &&
        item.created_at.getFullYear() === date.getFullYear()
    );

    return checkIn ?? null;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === id);
    return checkIn ?? null;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((item) => item.id_user === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.id_user === userId).length;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      id_user: data.id_user,
      id_gym: data.id_gym,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const index = this.items.findIndex((item) => item.id === checkIn.id);

    if (index >= 0) {
      this.items[index] = checkIn;
    }

    return checkIn;
  }
}
