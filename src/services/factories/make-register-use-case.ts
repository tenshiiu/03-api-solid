import { PrismaUsersRepository } from "@/repositores/prisma/prisma-users-repository";
import { RegisterService } from "../register";

export  function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    return registerUseCase
}