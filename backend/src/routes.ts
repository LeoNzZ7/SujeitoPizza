import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController()
const detailUserController = new DetailUserController()

router.get("/me", isAuthenticated, async (req, res) => {
  await detailUserController.handle(req, res);
})

router.post("/users", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});

router.post("/session", async (req: Request, res: Response) => {
    await authUserController.handle(req, res);
})

export { router } 