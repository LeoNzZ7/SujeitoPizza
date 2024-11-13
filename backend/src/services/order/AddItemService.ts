import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest) {
        if(!order_id) {
            throw new Error("É obrigatório o envio do ID do pedido!")
        }

        if(!product_id) {
            throw new Error("É obrigatório o envio do ID do produto!")
        }

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
            select: {
                price: true
            }
        }).catch(() => {
            throw new Error("Produto não encontrado!")
        })

        const subtotal = amount * product.price

        const item = await prismaClient.item.create({
            data: {
                order_id,
                product_id,
                amount,
                subtotal
            }
        })

        const orderPrice = await prismaClient.order.findFirst({
            where: {
                id: order_id
            },
            select: {
                total: true
            }
        })

        await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                total: orderPrice.total + subtotal
            }
        })

        return item
    }
}

export { AddItemService }