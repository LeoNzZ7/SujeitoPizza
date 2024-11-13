import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    async execute({ order_id }: OrderRequest) {

    const order = await prismaClient.order.update({
        where: {
            id: order_id
        },
        data: {
            draft: false
        }
    }).catch(() => {
        throw new Error("Pedido não encontrado!")
    })

    return order
    }
}

export {  SendOrderService}