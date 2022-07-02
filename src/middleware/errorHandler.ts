import { NextFunction, Request, Response } from "express";

class errorHandle {
    public error(err: any, _req: Request, res: Response, _next: NextFunction) {
        res.status(err.code || 500).json(err.message || 'Internal server error');
    }
}
export default errorHandle;