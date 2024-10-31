import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositores/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
    name: string,
    email: string,
    password: string,
}

export async function registerService({
    name,
    email,
    password
}: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    // 6 = Rounds, número de vezes que a senha é criptografada

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (userWithSameEmail) {
        throw new Error('E-mail already existing')
    }

    const prismaUsersRepository = new PrismaUsersRepository()

    prismaUsersRepository.create({
        name,
        email,
        password_hash,
    })
}