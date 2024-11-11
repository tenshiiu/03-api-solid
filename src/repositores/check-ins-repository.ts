import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    countByUserId(userId: string): Promise<number>
    save(checkIn: CheckIn): Promise<CheckIn>
    findById(id: string): Promise<CheckIn | null>
}