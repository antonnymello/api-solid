import { hash } from 'bcryptjs';
import { type UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists !== null) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
