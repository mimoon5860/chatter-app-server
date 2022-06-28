import { Response, Request } from "express";
import authServices from "../services/authService";

class authController {
    private authServices = new authServices();


    public signupController = async (req: Request, res: Response) => {
        const data = await this.authServices.signupService(req);

        if (data.success) {
            res.status(200).json(data);
        }
    }
}

export default authController;
