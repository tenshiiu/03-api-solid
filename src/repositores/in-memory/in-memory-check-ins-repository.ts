import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInsRepository {
     public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {
       const startOfTheDay = dayjs(date).startOf('date')
       const endOfTheDay = dayjs(date).endOf('date')


       const checkOnSameDate = this.items.find((checkIn) => {
        const checkInDate = dayjs(checkIn.create_at)
        const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

        return checkIn.user_id == userId && isOnSameDate
       }
    ) 

        if(!checkOnSameDate) {
            return null
        }

       return checkOnSameDate
    }   

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validate_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at:new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
}