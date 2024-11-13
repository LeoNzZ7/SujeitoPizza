import prismaClient from "../../prisma"

interface OrderRequest {
    order_id: string
}

class RemoveOrderService { 
    async execute({ order_id }: OrderRequest) {

        if(!order_id) {
            throw new Error("É obrigatório enviar o ID do pedido!")
        }

        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        }).catch((error) => {
           if (error.code === 'P2025') {
                throw new Error("Pedido não encontrado!");
            }
            throw new Error("Ocorreu um erro ao remover o pedido!");
        })

        return order
    }   
}

export { RemoveOrderService }