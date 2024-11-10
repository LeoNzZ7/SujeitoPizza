import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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

        return {  ok: true };
    }
}

export { AuthUserService }