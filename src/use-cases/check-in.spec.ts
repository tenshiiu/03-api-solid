import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositores/in-memory/in-memory-users-repository'
import { CheckInUseCase } from './checkin'
import { InMemoryCheckInRepository } from '@/repositores/in-memory/in-memory-check-ins-repository'

// Testes unitários: Não possuem relação com o banco de dados, são feitos separadamentes para não ocorrer conflitos nos dados

let checkInsRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryUsersRepository()
        sut = new CheckInUseCase(checkInsRepository)

        vi.isFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
    
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })
        
        expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })).rejects.toBeInstanceOf(Error)

    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
        
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})