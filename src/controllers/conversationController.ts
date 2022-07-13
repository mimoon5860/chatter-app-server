import { Request, Response } from "express";
import abstractController from "../abstracts/abstractController";
import conversationService from "../services/conversationServices";

class conversationController extends abstractController {
    private conversationService = new conversationService();
    constructor() {
        super();
    }

    public getAllConversation = this.wrap(async (req: Request, res: Response) => {
        const data = await this.conversationService.getAllConversation(req);
        if (data.success) {
            res.status(200).json(data)
        } else {
            res.status(500).json(data);
        }
    })
}
export default conversationController;