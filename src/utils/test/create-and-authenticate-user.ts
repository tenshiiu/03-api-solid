import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
    await request(app.server).post('/users').send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
    })

    const AuthResponse = await request(app.server).post('/sessions').send({
        email: 'johndoe@example.com',
        password: '123456',
    })

    const { token } = AuthResponse.body

    return {
        token,
    }
}