import { Request } from "express";
import db from "../model/db";

class conversationService extends db {

    // make a conversation 
    public createConversation = async (req: Request) => {
        let check = null;
        const conversationCollection = this.conversationCollection();
        if (req.body.participant.length === 2) {
            check = await conversationCollection.findOne({ $and: [{ 'participant': { $in: req.body.participant[0] } }, { 'participant': { $in: req.body.participant[1] } }, { 'type': 'personal' }] }).select({ _id: 1 });

            if (check) {
                return { success: true, conversation: check._id }
            } else {
                const data = new conversationCollection({ ...req.body, type: 'personal' })
                const result = await data.save();
                return { success: true, conversation: result._id }
            }
        } else {

            return { success: true }
        }
    }

    // delete conversation 
    public deleteConversation = async (req: Request) => {
        const { conversation, user } = req.body;
        const conversationCollection = this.conversationCollection();
        const result = await conversationCollection.updateOne({ _id: conversation }, { $pull: { participant: user } }, { new: true });

        if (result.modifiedCount) {
            return { success: true, msg: "Conversation Deleted successfully!" }
        } else {
            return { success: false, msg: "Something is wrong!" }
        }
    }

    //  get all conversations of an user 
    public getAllConversation = async (req: Request) => {
        const { userId } = req.params;

        const conversationCollection = this.conversationCollection();
        const data = await conversationCollection.find({ participant: userId }).select({ createdAt: 0, updatedAt: 0, __v: 0 });

        return { success: true, data }
    }

}

export default conversationService;