import prismaClient from "../../prisma"

interface ItemRequest {
    item_id: string
}

class RemoveItemService {
    async execute({ item_id }: ItemRequest) {

        if(!item_id) {
            throw new Error("É obrigatório o envio do ID do item do pedido!")
        }

        const item = await prismaClient.item.delete({
            where: {
                id: item_id
            }
        }).catch(() => {
            throw new Error("Item não encontrado!")
        })

        const order = await prismaClient.order.findUnique({
            where:{
                id: item.order_id
            }
        })

        await prismaClient.order.update({
            where: {
               id: order.id
            },
            data: {
                total: order.total - item.subtotal
            }
        })

        return item
    }
}

export { RemoveItemService }