import { Request } from "express";
import db from "../model/db";
import { CustomRequest } from "../utils/types/types";

class chatService extends db {
    constructor() {
        super();
    }

    // send msgs
    public sendMsg = async (req: CustomRequest) => {
        let body = req.body;
        console.log(req.body.conversation, req.body.message);
        if (req.upFiles) {
            body = { ...body, file: req.upFiles }
        }
        const chatCollection = this.chatCollection();
        const conversationCollection = this.conversationCollection();

        const res = await conversationCollection.findByIdAndUpdate({ _id: req.body.conversation }, { lastMsg: req.body.message }, { new: true });

        console.log({ res });
        const data = new chatCollection(body);
        const msg = await data.save();
        if (msg._id) {
            return { success: true, msg: "Message has been send successfully!" }
        } else {
            return { success: false, msg: "Something is wrong!" }
        }
    }

    // get all msg of a conversation
    public getMsgsOfConvo = async (req: Request) => {
        const { conversation } = req.params;
        const chatCollection = this.chatCollection();

        const data = await chatCollection.find({ conversation }, { __v: 0 });
        return {
            success: true, data
        }

    }
}

export default chatService;