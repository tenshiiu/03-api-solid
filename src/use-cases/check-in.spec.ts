import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checkin'
import { InMemoryCheckInRepository } from '@/repositores/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

// Testes unitários: Não possuem relação com o banco de dados, são feitos separadamentes para não ocorrer conflitos nos dados

let checkInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, InMemoryGymsRepository)

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'JavaScript Gym',
            description: '',
            phone: '0',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

        vi.isFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
    
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })
        
        expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })).rejects.toBeInstanceOf(Error)

    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
        
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})