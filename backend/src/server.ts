import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors"
import path from "path"

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

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