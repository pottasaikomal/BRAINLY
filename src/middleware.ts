import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWTPASSKEY} from "./config";

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token  = req.headers["authorization"];
    // console.log(req);
    const decoded = jwt.verify(token as string, JWTPASSKEY);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()
    }
}