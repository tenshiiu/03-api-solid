import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

// Testes unitários: Não possuem relação com o banco de dados, são feitos separadamentes para não ocorrer conflitos nos dados

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)
    })

    it('should be able to fetch search for gym', async () => {
        await gymsRepository.create({
           title: 'Javascript Gym',
           description: null,
           phone: null,
           latitude: -27.2092052,
           longitude: -49.6401091,
        })

        await gymsRepository.create({
           title: 'Typescript Gym',
           description: null,
           phone: null,
           latitude: -27.2092052,
           longitude: -49.6401091,
        })
    
        const { gyms } = await sut.execute({
           query: 'Javascript',
           page: 1
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Javascript Gym' })
        ])
    })

    it.skip('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i < 22; i++) {
            await gymsRepository.create({
              title: `Javascript Gym ${i}`,
              description: null,
              phone: null,
              latitude: -27.2092052,
              longitude: -49.6401091,
            })

            const { gyms } = await sut.execute({
                query: 'Javascript',
                page: 2,
            })

            expect(gyms).toHaveLength(2)
            expect(gyms).toEqual([
                expect.objectContaining({ title: 'Javascript Gym 21' }),
                expect.objectContaining({ title: 'Javascript Gym 22' }),
            ])
        }
    })
})