import { Request, Response } from "express";
import prismaClient from "../../prisma";

interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute({category_id}: ProductRequest) {
        if(!category_id) {
            throw new Error("É necessário o envio do ID da categoria do produto!")
        }

        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if(findByCategory.length === 0) {
            throw new Error("Nenhum produto encontrado com essa categoria!")
        }

        return findByCategory
    }
}

export { ListByCategoryService }