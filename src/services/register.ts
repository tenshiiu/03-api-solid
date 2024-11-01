import { prisma } from '@/lib/prisma'
import { usersRepository } from '@/repositores/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exist'

interface RegisterServiceRequest {
    name: string,
    email: string,
    password: string,
}

export class RegisterService {
    constructor(private usersRepository: usersRepository) {}

    async execute({ name, email, password }: RegisterServiceRequest) {
        const password_hash = await hash(password, 6)
    
        // 6 = Rounds, número de vezes que a senha é criptografada
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
    
        await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
    }
}