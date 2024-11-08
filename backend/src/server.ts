import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof Error) {
        res.status(400).json({ 
            error: error.message
        })
    }

    res.status(500).json({
        status: 'error',
        message: "Internal Server Error!"
    })
})

app.listen(3333, () => {
    console.log("Server started on port 3333")
})