import { Request } from "express";
import db from "../model/db";

class chatService extends db {
    constructor() {
        super();
    }

    // send msgs
    public sendMsg = async (req: Request) => {
        const chatCollection = this.chatCollection();
        const data = new chatCollection(req.body);
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

        const data = await chatCollection.find({ conversation }).populate('conversation');

        console.log({ data });
        return {
            success: true, data
        }

    }
}

export default chatService;