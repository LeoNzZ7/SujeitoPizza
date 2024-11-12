import { Request, Response } from "express"
import { CreateCategoryService } from "../../services/category/CreateCategoryService"

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const createCategoryService = new CreateCategoryService()
    
        const { name } = await req.body

        const category = await createCategoryService.execute({name})

        res.json(category)
    }
}

export { CreateCategoryController }