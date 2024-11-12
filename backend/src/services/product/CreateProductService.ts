import prismaClient from "../../prisma"

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({name, price, description, banner, category_id}: ProductRequest) {
        if(!name) {
            throw new Error("É obrigatório o envio do nome do produto!")
        }

        if(!price) {
            throw new Error("É obrigatório o envio do preço do produto!")
        }

        if(!description) {
            throw new Error("É obrigatório o envio da descrição do produto!")
        }

        if(!banner) {
            throw new Error("É obrigatório o envio da imagem do banner do produto!")
        }

        if(!category_id) {
            throw new Error("É obrigatório o envio da categoria do produto!")
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id
            }
        })

        return product
    }
}

export { CreateProductService }