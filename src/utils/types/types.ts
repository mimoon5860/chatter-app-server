import { Date } from "mongoose";

// user table Schema type 
export type IUser = {
    name: string;
    phone: string;
    photo?: string;
    verified: string;
    password: string;
    created: Date;
}
