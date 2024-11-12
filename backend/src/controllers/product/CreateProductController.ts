import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response){
        const { name, description, price, category_id, banner } = req.body
    
        const createProductService = new CreateProductService()

        if(!req.file) {
            throw new Error("É necessário o envio de uma foto para cadastrar o produto!")
        } else {
            const { originalname, filename: banner } = req.file

            const product = await createProductService.execute({
            name,
            description,
            price,
            category_id,
            banner
        })

        res.status(201).json(product)
        }
    }
}

export { CreateProductController };