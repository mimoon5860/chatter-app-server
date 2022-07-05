import { Request } from "express";
import db from "../model/db";

class friendService extends db {
    constructor() {
        super();
    }

    // send friend request service
    public sendFriendRequest = async (req: Request) => {
        const { sender_id, receiver_id, note } = req.body;
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
    public acceptFriendRequest = async (req: Request) => {
        const { requester, receiver } = req.body;
        const friendsCollection = this.friendsCollection();

        const check = await friendsCollection.findOne({ userId: requester, friendId: receiver }).select({ type: 1 });

        if (check.type === 'requested') {
            const result = await friendsCollection.findByIdAndUpdate(check._id, { type: 'friend' }, { new: true }).select({ type: 1 });
            if (result.type === 'friend') {
                return { success: true, msg: 'Friend request accept successfully!' }
            } else {
                return { success: false, msg: 'Cannot accept Request now!' };
            }
        } else {
            return { success: false, msg: 'Cannot accept Request now!' }
        }
    }

}
export default friendService;