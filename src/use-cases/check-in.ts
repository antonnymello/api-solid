import { type CheckIn } from '@prisma/client';
import { type CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { type GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error';
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) throw new MaxNumberOfCheckInsError();

    const checkIn = await this.checkInsRepository.create({
      id_gym: gymId,
      id_user: userId,
    });

    return { checkIn };
  }
}
