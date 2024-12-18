import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const listOrdersService = new ListOrdersService()

        const order = await listOrdersService.execute()

        res.status(200).json(order)
    }
}

export { ListOrdersController }