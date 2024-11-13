import { PrismaCheckInsRepository } from "@/repositores/prisma/prisma-check-in-repository";
import { PrismaGymsRepository } from "@/repositores/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";

export function makeCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}