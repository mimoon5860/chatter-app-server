import { NextFunction, Request } from 'express';
import abstractServices from '../abstracts/abstractServices';

class authServices extends abstractServices {

    constructor() {
        super();
    }

    public signupService = async (req: Request, next: NextFunction) => {
        try {
            const user = req.body;
            const connection = this.getUserConnection();
            const checkNumber = await connection.findOne({ phone: user.phone })
            console.log(checkNumber);
            const result = await connection.insertOne({ ...user, status: 'unverified', photo: null });
            if (result.insertedId) {
                return { success: true, userId: result.insertedId }
            } else {
                return { success: false, msg: 'Could not create an user' }
            }
        } catch (err) {
            console.log(err)
        } finally {
            this.client.close();
        }
    }
}

export default authServices;