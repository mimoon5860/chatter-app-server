import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import db from "../model/db";
import authServices from "../services/authService";

class authController {
    private authServices = new authServices();

    //signup new user
    public signupController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.authServices.signupService(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }

    // Login user
    public loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.authServices.loginService(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }
}

export default authController;
