import { Gym, Prisma } from "@prisma/client";

export interface findManyNearbyParams {
    latitude: number;
    longitude: number;
}

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    findManyNearby(latitude: number, longitude: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise <Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
}