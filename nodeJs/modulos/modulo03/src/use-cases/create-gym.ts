import { Gym } from '@prisma/client';

import { GymsRepository } from '@/repositories/gyms-repository';

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {

  // tem um construtor e dentro dele pode receber as dependencias
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title, description, phone, latitude, longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title, description, phone, latitude, longitude
    })

    return { gym }
  }
}
