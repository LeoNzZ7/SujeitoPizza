import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddIemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";

import uploadConfig from "./config/multer"
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//Instâncias das controllers relacionadas à criação, autenticação e detalhes de usuário.
const createUserController = new CreateUserController();
const authUserController = new AuthUserController()
const detailUserController = new DetailUserController()

//Instâncias de controllers relacionadas à criação e a detalhes das categorias dos produtos.
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
 
//Instâncias de controllers relacionadas a criação e detalhes dos produtos.
const createProductController = new CreateProductController()
const listByCategoryController = new ListByCategoryController()

//Instâncias de controllers relacionadas a criação e detalhes dos pedidos.
const createOrderController = new CreateOrderController()
const removeOrderController = new RemoveOrderController()
const addItemController = new AddItemController()
const removeItemController = new RemoveItemController()
const sendOrderController = new SendOrderController()
const listOrdersController = new ListOrdersController()
const detailOrderController = new DetailOrderController()
const finishOrderController = new FinishOrderController()

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

//Rotas relacionadas a criação e detalhes das categorias.
router.post("/category",isAuthenticated  ,async (req: Request, res: Response) => {
  await createCategoryController.handle(req, res);
})

router.get("/category", isAuthenticated, async (req: Request, res: Response) => {
  await listCategoryController.handle(req, res);
})

//Rotas relacionadas à criação e detalhes dos produtos.
router.post("/product", isAuthenticated, upload.single("file"), async (req: Request, res: Response) => {
  await createProductController.handle(req, res);
})

router.get("/category/product", isAuthenticated, async (req: Request, res: Response) => {
  await listByCategoryController.handle(req, res);
}) 

//Rotas relacionadas à criação e detalhes dos pedidos.
router.post("/order", isAuthenticated, async (req: Request, res: Response) => {
  await createOrderController.handle(req, res)
})

router.delete("/order", isAuthenticated, async (req: Request, res: Response) => {
  await removeOrderController.handle(req, res)
})

router.post("/order/add", isAuthenticated, async (req: Request, res: Response) =>{
  await addItemController.handle(req, res)
})

router.delete("/order/delete", isAuthenticated, async (req: Request, res: Response) =>{
  await removeItemController.handle(req, res)
})

router.put("/order/send", isAuthenticated, async (req: Request, res: Response) =>{
  await sendOrderController.handle(req, res)
})

router.get("/orders", isAuthenticated, async (req: Request, res: Response) =>{
  await listOrdersController.handle(req, res)
})

router.get("/order/details", isAuthenticated, async (req: Request, res: Response) =>{
  await detailOrderController.handle(req, res)
})

router.put("/order/finish", isAuthenticated, async (req: Request, res: Response) =>{
  await finishOrderController.handle(req, res)
})

export { router } 