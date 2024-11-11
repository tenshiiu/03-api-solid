import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositores/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

// Testes unitários: Não possuem relação com o banco de dados, são feitos separadamentes para não ocorrer conflitos nos dados

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get Metrics User Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })
    
        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})