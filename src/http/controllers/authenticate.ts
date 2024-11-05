import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        await authenticateUseCase.execute({
            email,
            password,
        })

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(409).send({ message: "Email already exists." })
        }

        throw err
    }

    return reply.status(200).send()
}