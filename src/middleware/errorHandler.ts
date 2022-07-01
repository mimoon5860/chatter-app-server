import { NextFunction, Request, Response } from "express";

class errorHandle {
    public error(err: Error, _req: Request, res: Response, _next: NextFunction) {
        console.log(err);
        res.status(500).send(err);
    }
}
export default errorHandle;