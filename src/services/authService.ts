import { Request } from 'express';
import db from '../model/db';
import lib from '../utils/lib/lib';

class authServices extends db {

    constructor() {
        super();
    }
    // sign up service
    public signupService = async (req: Request) => {
        const user = req.body;
        const userCollection = this.userCollection();
        const check = await userCollection.find({ phone: user.phone });
        if (check.length) {
            return { success: false, msg: 'Phone already exist!' }
        } else {
            const hashedPass = await lib.hashPass(user.password);
            const result = new userCollection({ ...user, password: hashedPass });
            await result.save();
            return { success: true, userId: result._id }
        }
    }


    // Login service
    public loginService = async (req: Request) => {
        const creds = req.body;

        const userCollection = this.userCollection();
        const checkUser = await userCollection.findOne({ phone: creds.phone });
        if (checkUser) {
            const { password, __v, ...rest } = checkUser._doc;
            const passCheck = await lib.compare(creds.password, password)
            if (passCheck) {
                return { success: true, data: rest }
            } else {
                return { success: false, msg: "Wrong password!" }
            }
        } else {
            return { success: false, msg: "Wrong phone number!" }
        }

    }
}

export default authServices;