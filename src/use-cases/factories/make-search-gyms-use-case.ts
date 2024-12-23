import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositores/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymUseCase(gymsRepository)

    return useCase
}