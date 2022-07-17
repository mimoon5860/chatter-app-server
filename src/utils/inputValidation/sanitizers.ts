import { CustomSanitizer } from "express-validator";
import { ObjectId } from 'mongodb';

class sanitizers {
    public static toObjectId: CustomSanitizer = value => {
        return new ObjectId(value);
    };


}



export default sanitizers;