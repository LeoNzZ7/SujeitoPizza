import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

//Instâncias das controllers relacionadas à criação, autenticação e detalhe de usuário.
const createUserController = new CreateUserController();
const authUserController = new AuthUserController()
const detailUserController = new DetailUserController()

//Instâncias de controllers relacionadas à a criação de categorias de produtos.
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
 
//Rotas relacionado à criação, autenticação e detalhes do usuário.
router.post("/users", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});

router.post("/session", async (req: Request, res: Response) => {
    await authUserController.handle(req, res);
})

router.get("/me", isAuthenticated, async (req, res) => {
  await detailUserController.handle(req, res);
})

//Rotas relacionado à criação de categorias.
router.post("/category",isAuthenticated  ,async (req: Request, res: Response) => {
  await createCategoryController.handle(req, res);
})

router.get("/category", isAuthenticated, async (req: Request, res: Response) => {
  await listCategoryController.handle(req, res);
})

export { router } 