import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositores/gyms-repository'

interface CreateGymUseCaseRequest {
    title: string,
    description?: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface RegisterUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) {}

    async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const gym = await this.gymsRepository.create({
            title, 
            description, 
            phone, 
            latitude, 
            longitude
        })

        return {
          gym,
        }
    }
}