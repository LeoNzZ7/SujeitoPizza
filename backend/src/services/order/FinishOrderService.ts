import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class FinishOrderService {
    async execute({ order_id }: OrderRequest) {
        if(!order_id) {
            throw new Error("É obrigatório o envio do ID do pedido!")
        }

        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true,
                draft: false
            }
        }).catch(() => {
            throw new Error("Pedido não encontrado!")
        })
        
        return order
    }
}

export { FinishOrderService }