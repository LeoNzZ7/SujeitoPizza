import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

const router = Router();

//Instâncias das controllers relacionadas à criação, autenticação e detalhes de usuário.
const createUserController = new CreateUserController();
const authUserController = new AuthUserController()
const detailUserController = new DetailUserController()

//Instâncias de controllers relacionadas à criação e a detalhes das categorias dos produtos.
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
 
//Instâncias de controllers relacionadas a criação e detalhes dos produtos.
const createProductController = new CreateProductController()

//Rotas relacionadas à criação, autenticação e detalhes do usuário.
router.post("/users", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});

router.post("/session", async (req: Request, res: Response) => {
    await authUserController.handle(req, res);
})

router.get("/me", isAuthenticated, async (req, res) => {
  await detailUserController.handle(req, res);
})

//Rotas relacionadas à criação e detalhes das categorias dos produtos.
router.post("/category",isAuthenticated  ,async (req: Request, res: Response) => {
  await createCategoryController.handle(req, res);
})

router.get("/category", isAuthenticated, async (req: Request, res: Response) => {
  await listCategoryController.handle(req, res);
})

//Rotas relacionadas a criação e detalhes das categorias.
router.post("/product", isAuthenticated, async (req: Request, res: Response) => {
  await createProductController.handle(req, res);
}) 

export { router } 