import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositores/in-memory/in-memory-gyms-repository'

// Testes unitários: Não possuem relação com o banco de dados, são feitos separadamentes para não ocorrer conflitos nos dados


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to create gym', async () => {

        const { gym } = await sut.execute({
           title: 'JavaScript Gym',
           description: null,
           phone: null,
           latitude: -27.2092052,
           longitude: -49.6401091,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
 })
