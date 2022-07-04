import { Date, Types } from "mongoose";

// user table Schema type 
export type TUser = {
    name: string;
    phone: string;
    photo?: string;
    verified: string;
    password: string;
}

export type TFriend = {
    userId: Types.ObjectId,
    friendId: Types.ObjectId,
    type: string,
    note: string
}
