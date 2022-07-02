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
        const user = await userCollection.findById(id);
        if (user) {
            const { password, __v, ...rest } = user._doc;
            return { success: true, data: rest };
        } else {
            return { success: false, msg: "Wrong user id" };
        }
    }
}

export default userServices;