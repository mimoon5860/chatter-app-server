import { NextFunction, Request, Response } from "express";
import multer from 'multer';

class errorHandle {
    public error(err: any, _req: Request, res: Response, _next: NextFunction) {
        if (err) {
            if (err instanceof multer.MulterError) {
                res.status(400).json(err.message || 'Internal server error');
            } else {
                res.status(err.code || 500).json(err.message || 'Internal server error');
            }
        }
    }
}
export default errorHandle;