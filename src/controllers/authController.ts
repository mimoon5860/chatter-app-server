import { Response, Request } from "express";
import authServices from "../services/authService";

class authController {
    authServices = new authServices();

    public signupController = async (_req: Request, res: Response) => {
        const data = await this.authServices.signupService();
        res.status(200).json(data);
    }
}

export default authController;
