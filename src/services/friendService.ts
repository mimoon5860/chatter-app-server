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

    // cancel friend request service
    public cancelRequest = async (req: Request) => {
        const { user_id, friend_id } = req.body;
        const friendsCollection = this.friendsCollection();
        const checkFromUser = await friendsCollection.findOne({ userId: friend_id, friendId: user_id }).select({ type: 1 });

        if (checkFromUser.type === 'requested') {
            const result = await friendsCollection.deleteOne({ _id: checkFromUser._id });

            if (result.deletedCount) {
                return { success: true, msg: 'Cancel friend request successful!' }
            } else {
                return { success: false, msg: 'Cannot cancel friend request now!' };
            }
        } else {
            return { success: false, msg: 'Invalid id or relationship!' }
        }
    }


    // block user service
    public userBlockFriend = async (req: Request) => {
        const { user_id, friend_id } = req.body;

        const friendsCollection = this.friendsCollection();
        const checkFromUser = await friendsCollection.findOne({ userId: user_id, friendId: friend_id }).select({ type: 1 });
        const checkFromFriend = await friendsCollection.findOne({ userId: friend_id, friendId: user_id }).select({ type: 1 });

        if (checkFromUser?.type === 'friend' || checkFromFriend?.type === 'friend' || (checkFromUser?.type === null && checkFromFriend?.type === null)) {
            const result = await friendsCollection.findByIdAndUpdate(checkFromUser._id || checkFromFriend._id, { type: "blocked", userId: user_id, friendId: friend_id }, { new: true }).select({ type: 1 });

            if (result.type === 'blocked') {
                return { success: true, msg: 'User blocked successful!' }
            } else {
                return { success: false, msg: 'Cannot block user now!' };
            }
        } else {
            return { success: false, msg: 'Invalid id or relationship!' }
        }
    }


    // unblock service
    public userUnblockFriend = async (req: Request) => {
        const { user_id, friend_id } = req.body;

        const friendsCollection = this.friendsCollection();
        const checkFromUser = await friendsCollection.findOne({ userId: user_id, friendId: friend_id }).select({ type: 1 });

        if (checkFromUser.type === 'blocked') {
            const result = await friendsCollection.deleteOne({ _id: checkFromUser._id });

            if (result.deletedCount) {
                return { success: true, msg: 'User unblocked successful!' }
            } else {
                return { success: false, msg: 'Cannot unblock user now!' };
            }
        } else {
            return { success: false, msg: 'Invalid id or relationship!' }
        }
    }


    // unfriend service
    public unFriend = async (req: Request) => {
        const { user_id, friend_id } = req.body;

        const friendsCollection = this.friendsCollection();
        const checkFromUser = await friendsCollection.findOne({ userId: user_id, friendId: friend_id }).select({ type: 1 });
        const checkFromFriend = await friendsCollection.findOne({ userId: friend_id, friendId: user_id }).select({ type: 1 });

        if (checkFromUser?.type === 'friend' || checkFromFriend?.type === 'friend') {
            const result = await friendsCollection.deleteOne({ _id: checkFromUser._id });

            if (result.deletedCount) {
                return { success: true, msg: 'User unfriend successful!' }
            } else {
                return { success: false, msg: 'Cannot unfriend user now!' };
            }
        } else {
            return { success: false, msg: 'Invalid id or relationship!' }
        }
    }



}
export default friendService;