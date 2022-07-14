import { Request, Response } from "express";
import abstractController from "../abstracts/abstractController";
import chatService from "../services/chatsService";

class chatsController extends abstractController {

    private chatService: chatService = new chatService();


    constructor() {
        super();
    }


    // send sms controller 
    public sendMsgController = this.wrap(async (req: Request, res: Response) => {

        const data = await this.chatService.sendMsg(req);

        if (data.success) {
            res.status(200).json(data);
        } else {
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