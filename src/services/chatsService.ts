import { Request } from "express";
import db from "../model/db";

class chatService extends db {
    constructor() {
        super();
    }

    public sendMsg = async (req: Request) => {
        const { senderId, receiverId, message, conversation } = req.body;
        const conversationCollection = this.conversationCollection();
        const chatCollection = this.chatCollection();
        if (!conversation) {
            const conversation = new conversationCollection({ creator: senderId, participant: [senderId, receiverId] });
            const convo = await conversation.save();
            req.body.conversation = convo._id;
        }

        const data = new chatCollection({ message, senderId, receiverId, conversation: req.body.conversation });
        const msg = await data.save();
        if (msg._id) {
            return { success: true, msg: "Message has been send successfully!" }
        } else {
            return { success: false, msg: "Something is wrong!" }
        }
    }

    public getAllConversation = async (req: Request) => {
        const { userId } = req.params;

        return { success: true }

    }
}

export default chatService;