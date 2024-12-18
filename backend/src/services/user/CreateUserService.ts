import prismaClient from "../../prisma";
import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({ name, email, password }: UserRequest) {
        if(!email) {
            throw new Error("É obrigatório o usuário enviar um endereço de email!")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if(userAlreadyExists) {
            throw new Error("Esse email já está em uso!")
        }

        if(!password) {
            throw new Error("É obrigatório o usuário enviar uma senha!")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService }