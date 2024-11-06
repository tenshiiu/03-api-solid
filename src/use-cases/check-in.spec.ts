import { expect, describe, it, beforeEach } from 'vitest'
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
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})