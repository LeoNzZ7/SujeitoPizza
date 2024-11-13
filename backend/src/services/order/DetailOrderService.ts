import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailRequest) {
        if(!order_id) {
            throw new Error("É obrigatório o envio do ID do pedido!")
        }

        const order = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            },
            include: {
                product: true,
                order: true
            }
        }).catch(() => {
            throw new Error("Pedido não encontrado!");
        })

        return order;
    }
}

export { DetailOrderService }