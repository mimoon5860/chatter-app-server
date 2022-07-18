import { Request, Response } from "express";
import abstractController from "../abstracts/abstractController";
import chatService from "../services/chatsService";
import { CustomRequest } from "../utils/types/types";

class chatsController extends abstractController {

    private chatService: chatService = new chatService();

    constructor() {
        super();
    }

    // send sms controller 
    public sendMsgController = this.wrap(async (req: CustomRequest, res: Response) => {

        const data = await this.chatService.sendMsg(req);

        if (data.success) {
            res.status(200).json(data);
        } else {
            if (req.upFiles) {
                this.deleteFile.delete(req.upFolder, req.upFiles);
            }
            res.status(500).json(data);
        }
    });

    // get all msgs of a conversation controller
    public getMsgsOfConvo = this.wrap(async (req: Request, res: Response) => {
        const data = await this.chatService.getMsgsOfConvo(req);

        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(500).json(data);
        }
    })
}




export default chatsController;