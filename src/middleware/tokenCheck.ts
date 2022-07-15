import { NextFunction, Request, Response } from "express";
import lib from "../utils/lib/lib";

class tokenCheck {
    public async tokenCheck(req: Request, res: Response, next: NextFunction) {
        const verifyToken = await lib.verifyToken(req.cookies.token);
        console.log({ verifyToken })
        if (verifyToken) {
            next();
        } else {
            res.status(400).send('Unable to verify token! Please Login.');
        }
    }
}

export default tokenCheck;