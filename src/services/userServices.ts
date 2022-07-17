import { Request } from "express";
import db from "../model/db";
import { CustomRequest, TFriend, TUser } from "../utils/types/types";

class userServices extends db {
    constructor() {
        super();
    }

    // search an user by phone 
    public searchAnUser = async (req: Request) => {
        const { phone } = req.params;
        const userCollection = this.userCollection();
        const user: TUser = await userCollection.findOne({ phone }).select({ name: 1, phone: 1, photo: 1 });
        if (user) {
            return { success: true, data: user };
        } else {
            return { success: false, msg: "Cannot found any user with this phone" };
        }
    }

    // get an user service
    public getAnUserService = async (req: Request) => {
        const { viewer, user } = req.params;
        const userCollection = this.userCollection();
        const friendsCollection = this.friendsCollection();

        const checkFromViewer: TFriend = await friendsCollection.findOne({ userId: viewer, friendId: user }).select({ type: 1 });
        const checkFromUser = await friendsCollection.findOne({ userId: user, friendId: viewer }).select({ type: 1 });

        const userData: TUser = await userCollection.findById(user).select({ password: 0, verified: 0, createdAt: 0, updatedAt: 0, __v: 0 });

        if (checkFromViewer) {
            switch (checkFromViewer.type) {
                case "friend":
                    return { success: true, data: userData, type: "friend" }
                case "requested":
                    return { success: true, data: userData, type: "requesting" }
                case "blocked":
                    return { success: true, data: userData, type: "blocking" }
                default:
                    return { success: false, msg: 'Something is wrong!' }
            }
        } else if (checkFromUser) {
            switch (checkFromUser.type) {
                case "friend":
                    return { success: true, data: userData, type: "friend" }
                case "requested":
                    return { success: true, data: userData, type: "requested" }
                case "blocked":
                    return { success: true, type: "blocked" }
                default:
                    return { success: false, msg: 'Something is wrong!' }
            }
        } else {
            if (userData) {
                return { success: true, data: userData }
            } else {
                return { success: false, msg: 'Something is wrong!' }
            }
        }
    }

    // user upload avatar
    public uploadUserAvatar = async (req: CustomRequest) => {
        const userCollection = this.userCollection();
        const result = await userCollection.findByIdAndUpdate({ _id: req.params.id }, { photo: req.upFiles }, { new: true })
        return { success: true, }
    }



}


export default userServices;