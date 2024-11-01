import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
    name: string,
    email: string,
    password: string,
}

export class RegisterService {
    constructor(private usersRepository: any) {}

    async execute({ name, email, password }: RegisterServiceRequest) {
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
    
        // const prismaUsersRepository = new PrismaUsersRepository()
    
        await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
    }
}