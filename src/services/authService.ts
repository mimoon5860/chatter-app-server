import { Request } from 'express';
import db from '../model/db';
import { ObjectId } from 'mongodb'

class authServices extends db {

    constructor() {
        super();
    }

    public signupService = async (req: Request) => {
        try {
            const user = req.body;
            const connection = this.getUserConnection();
            const result = await connection.insertOne({ ...user, status: 'unverified' });

            if (result.insertedId) {
                return { success: true, userId: result.insertedId }
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.client.close();
        }
    }
}

export default authServices;