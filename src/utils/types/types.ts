import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

// abstract controller wrap type 
export type func = (req: Request, res: Response, next: NextFunction) => Promise<void>;

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

export type TConversation = {
    creator: Types.ObjectId,
    participant: Types.ObjectId[]
}

export type TChat = {
    message: string,
    senderId: Types.ObjectId,
    receiverId: Types.ObjectId,
    status: string,
    file: string[],
    conversation: Types.ObjectId
}
