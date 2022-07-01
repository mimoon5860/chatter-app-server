import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import authServices from "../services/authService";

class authController {
    private authServices = new authServices();

    public signupController = async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
        } else {
            const data = await this.authServices.signupService(req, next);
            if (data.success) {
                res.status(200).json(data);
            } else {
                next(data.msg || 'Something is wrong! try again.');
            }
        }

    }
}

export default authController;
