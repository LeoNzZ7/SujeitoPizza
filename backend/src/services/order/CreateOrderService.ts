import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name: string;
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {

        if(!table) {
            throw new Error("É obrigatório o envio do número da mesa!")
        }

        const order = await prismaClient.order.create({
            data: {
                table,
                name,
                total: 0
            }
        })

        return order
    }
}

export { CreateOrderService }