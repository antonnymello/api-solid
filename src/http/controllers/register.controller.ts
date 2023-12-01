import { prisma } from '@/lib/prisma';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: { name, email, password_hash: password },
  });

  return reply.status(201).send();
};
