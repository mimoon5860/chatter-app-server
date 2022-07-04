import { Request } from "express";
import db from "../model/db";

class userServices extends db {
    constructor() {
        super();
    }

    // get an user service
    public getAnUserService = async (req: Request) => {
        const { id } = req.params;
        const userCollection = this.userCollection();
        const user = await userCollection.findById(id).select({ password: 0, __v: 0 });
        if (user) {
            return { success: true, data: user };
        } else {
            return { success: false, msg: "Wrong user id" };
        }
    }

    // send friend request service
    public sendRequestService = async (req: Request) => {
        const { sender_id, receiver_id, note } = req.body;
        console.log(req.body);
        const friendsCollection = this.friendsCollection();

        const checkFromSender = await friendsCollection.findOne({ userId: sender_id, friendId: receiver_id }).select({});
        const checkFromReceiver = await friendsCollection.findOne({ userId: receiver_id, friendId: sender_id });

        if (!checkFromSender && !checkFromReceiver) {
            const result = new friendsCollection({ userId: sender_id, friendId: receiver_id, note, type: 'requested' });
            const data = await result.save();
            return { success: true, msg: 'Friend request send successfully' }
        } else if (checkFromSender) {
            return { success: false, msg: `You Already ${checkFromSender.type}` }
        } else if (checkFromReceiver) {
            return { success: false, msg: `He Already ${checkFromReceiver.type}` }
        } else {
            return { success: false, msg: 'Cannot Send Request now!' }
        }
    }



    // accept friend request service
    public acceptRequestService = async (req: Request) => {
        const { requester, receiver } = req.body;
        console.log(req.body);
        const friendsCollection = this.friendsCollection();

        const check = await friendsCollection.findOne({ userId: requester, friendId: receiver }).select({ type: 1 });

        if (!check) {

            return { success: true, msg: 'Friend request send successfully' }
        } else {
            return { success: false, msg: 'Cannot accept Request now!' }
        }
    }


}


export default userServices;