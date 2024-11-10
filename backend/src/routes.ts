import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

router.post("/users", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});

export { router } 