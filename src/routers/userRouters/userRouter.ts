import { body, param } from "express-validator";
import abstractRouter from "../../abstracts/abstractRouters";
import userController from "../../controllers/userController";
import sanitizers from "../../utils/inputValidation/sanitizers";

class userRouter extends abstractRouter {
    private userController = new userController();
    constructor() {
        super();

        this.callRouter()
    }

    private callRouter() {
        //get an user router
        this.router.get('/get/:id', param('id').customSanitizer(sanitizers.toObjectId), this.userController.getAnUser);

        // user add friend
        this.router.post('/send/request', body('sender_id').exists().customSanitizer(sanitizers.toObjectId), body('receiver_id').exists().customSanitizer(sanitizers.toObjectId), this.userController.sendFriendRequest);

        // user accept friend request
        this.router.post('/send/request', body('requester').exists().customSanitizer(sanitizers.toObjectId), body('receiver').exists().customSanitizer(sanitizers.toObjectId), this.userController.acceptFriendRequest);
    }
}

export default userRouter;