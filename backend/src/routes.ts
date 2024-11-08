import { Router, Request, Response } from "express";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server online" })
})

export { router } 