import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        if(name === "") {
            throw new Error("É necessário enviar um nome válido para realizar o cadastro!")
        }
        
        const category = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })

        return { category }
    }
}

export { CreateCategoryService }