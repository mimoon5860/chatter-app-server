import { Request, Response } from "express";
import abstractController from "../abstracts/abstractController";
import chatService from "../services/chatsService";

class chatsController extends abstractController {

    private chatService: chatService = new chatService();


    constructor() {
        super();
    }

    // get all conversation
    public getAllConversation = this.wrap(async (req: Request, res: Response) => {
        const data = await this.chatService.getAllConversation(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(500).json(data);
        }
    })


    // send sms controller 
    public sendMsgController = this.wrap(async (req: Request, res: Response) => {

        const data = await this.chatService.sendMsg(req);

        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(500).json(data);
        }
    });
}




export default chatsController;