import { compare } from "bcryptjs";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositores/check-ins-repository";
import { GymsRepository } from "@/repositores/gyms-repository";
import { ResourceNotExistError } from "./errors/resource-not-exist-error";

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
} 

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}

    async execute({
         userId, 
         gymId,
        }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
            const gym = await this.gymsRepository.findById(gymId)

            if (!gym) {
                throw new ResourceNotExistError()
            }

            

            const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
                userId,
                new Date(),
            )

            if (checkInOnSameDay) {
                throw new Error()
            }

            const checkIn = await this.checkInsRepository.create({
                gym_id: gymId,
                user_id: userId,
            })
        
        return {
            checkIn,
        }
    }
}