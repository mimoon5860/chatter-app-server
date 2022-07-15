import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../model/config';
class lib {

    //Hash password
    public static async hashPass(password: string) {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(password, salt);
    }

    // compare hash password
    public static async compare(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }


    // create jwt token
    public static async makeToken(data: any) {
        const token = jwt.sign(data, jwtSecret);
        return token;
    }

    // verify jwt token 
    public static async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            return decoded;
        } catch (err) {
            return null;
        }
    }
}

export default lib;