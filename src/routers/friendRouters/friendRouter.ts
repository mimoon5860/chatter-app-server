import { body } from "express-validator";
import abstractRouter from "../../abstracts/abstractRouters";
import friendController from "../../controllers/friendController";
import sanitizers from "../../utils/inputValidation/sanitizers";

class friendRouter extends abstractRouter {
    private friendController = new friendController();
    constructor() {
        super();
        this.callRouter()
    }

    private callRouter() {

        // send request for add friend router
        this.router.post('/send/request', body('sender_id').exists().customSanitizer(sanitizers.toObjectId), body('receiver_id').exists().customSanitizer(sanitizers.toObjectId), this.friendController.sendFriendRequest);

        // accept friend request
        this.router.post('/accept/request', body('requester').exists().customSanitizer(sanitizers.toObjectId), body('receiver').exists().customSanitizer(sanitizers.toObjectId), this.friendController.acceptFriendRequest);
    }

}

export default friendRouter;