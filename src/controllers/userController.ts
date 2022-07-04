import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import userServices from "../services/userServices";

class userController {
    private userServices = new userServices();


    // get an user controller 
    public getAnUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.userServices.getAnUserService(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            console.log({ err });
            next(err);
        }
    }

    // send friend request controller
    public sendFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.userServices.sendRequestService(req);
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


    // accept friend request controller
    public acceptFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.userServices.acceptRequestService(req);
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
export default userController;