import { type FastifyReply, type FastifyRequest } from 'fastify';

export const verifyJWT = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
};
