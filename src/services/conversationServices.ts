import { Request } from "express";
import db from "../model/db";

class conversationService extends db {


    public getAllConversation = async (req: Request) => {
        const { userId } = req.params;

        const conversationCollection = this.conversationCollection();
        const data = await conversationCollection.findOne({ participant: userId }).populate({ path: 'Users', select: 'name' });

        return { success: true, data }
    }

}

export default conversationService;