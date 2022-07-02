import { Request } from 'express';
import db from '../model/db';

class authServices extends db {

    constructor() {
        super();
    }

    public signupService = async (req: Request) => {
        const user = req.body;
        const userCollection = this.userCollection();
        const result = new userCollection(user);
        await result.save();
        return { success: true, userId: result._id }
    }
}

export default authServices;