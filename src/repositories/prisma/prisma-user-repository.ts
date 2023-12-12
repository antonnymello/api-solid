import { prisma } from '@/lib/prisma';
import { type UsersRepository } from '@/repositories/users-repository';
import { type User, type Prisma } from '@prisma/client';

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
