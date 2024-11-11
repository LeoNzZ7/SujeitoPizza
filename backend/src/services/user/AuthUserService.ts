import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface  AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        if(!email) {
            throw new Error("É obrigatório o usuário enviar um endereço de email!")
        }

        if(!password) {
            throw new Error("É obrigatório o usuário enviar uma senha!")
        }   

        const user = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if(!user) {
            throw new Error("Email inexistente!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Senha Incorreta!")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JTW_SECRET_KEY as string,
            {
                subject: user.id,
                expiresIn: "30d"
            }
        )   

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { AuthUserService }