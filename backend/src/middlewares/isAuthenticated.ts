import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export async function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = await req.headers.authorization

    if(!authToken) {
        res.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET_KEY) as Payload

        if(!sub) {
            res.status(401).end();
        }

        req.user_id = sub

        return next()
    } catch (error) {
        res.status(401).end(); 
    }
}