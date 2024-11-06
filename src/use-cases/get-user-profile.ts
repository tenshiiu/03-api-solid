import { usersRepository } from "@/repositores/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotExistError } from "./errors/resource-not-exist-error";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user:User
} 

export class GetUserProfileUseCase {
    constructor(
        private usersRepository: usersRepository,
    ) {}

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)
    
        if(!user) {
            throw new ResourceNotExistError()
        }
        
        return {
          user,
        }
    }
}