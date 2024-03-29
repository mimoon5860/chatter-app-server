import { Request, Response } from "express";
import abstractController from "../abstracts/abstractController";
import userServices from "../services/userServices";
import { CustomRequest } from "../utils/types/types";

class userController extends abstractController {
    private userServices = new userServices();

    //Search an user by phone controller
    public searchAnUser = this.wrap(async (req: Request, res: Response) => {

        const data = await this.userServices.searchAnUser(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        }


    })


    // get an user controller 
    public getAnUser = this.wrap(async (req: Request, res: Response) => {

        const data = await this.userServices.getAnUserService(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }

    })


    // user upload avatar
    public uploadUserAvatar = this.wrap(async (req: CustomRequest, res: Response) => {
        const data = await this.userServices.uploadUserAvatar(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            if (req.upFiles) {
                this.deleteFile.delete(req.upFolder, req.upFiles);
            }
            res.status(403).json(data);
        }
    })

    // get simple user photo and name
    public getUserNameAndPhoto = this.wrap(async (req: Request, res: Response) => {
        const data = await this.userServices.getUserNameAndPhoto(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        }
    })
}
export default userController;