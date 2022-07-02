import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import authServices from "../services/authService";

class authController {
    private authServices = new authServices();

    public signupController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.authServices.signupService(req);
                if (!data) {
                    res.status(200).json(data);
                } else {
                    next(" ");
                }
            }
        } catch (err) {
            next(err);
        }

    }
}

export default authController;
