import { Response, Request } from "express";
import abstractController from "../abstracts/abstractController";
import authServices from "../services/authService";

class authController extends abstractController {
    private authServices = new authServices();

    //signup new user
    public signupController = this.wrap(async (req: Request, res: Response) => {
        const data = await this.authServices.signupService(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }
    })

    // Login user
    public loginUser = this.wrap(async (req: Request, res: Response) => {
        const data = await this.authServices.loginService(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }

    })
}

export default authController;
