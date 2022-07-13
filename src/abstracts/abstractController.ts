import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { func } from "../utils/types/types";

class abstractController {
    public wrap(cb: func) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ success: false, errors: errors.array() });
                } else {
                    await cb(req, res, next);
                }
            } catch (err: any) {
                next(err);
            }
        };
    }
}

export default abstractController;