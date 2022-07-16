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
        this.router.post('/send/request', this.checkToken.tokenCheck, body('sender_id').exists().customSanitizer(sanitizers.toObjectId), body('receiver_id').exists().customSanitizer(sanitizers.toObjectId), this.friendController.sendFriendRequest);

        // accept friend request
        this.router.put('/accept/request', body('requester').exists().customSanitizer(sanitizers.toObjectId), body('receiver').exists().customSanitizer(sanitizers.toObjectId), this.friendController.acceptFriendRequest);

        // cancel friend request
        this.router.put('/cancel/request', body('user_id').exists().customSanitizer(sanitizers.toObjectId), body('friend_id').exists().customSanitizer(sanitizers.toObjectId), this.friendController.cancelFriendRequest)

        // unfriend a friend 
        this.router.put('/action/unfriend', body('user_id').exists().customSanitizer(sanitizers.toObjectId), body('friend_id').exists().customSanitizer(sanitizers.toObjectId), this.friendController.unFriend)

        // block a friend 
        this.router.put('/action/block', body('user_id').exists().customSanitizer(sanitizers.toObjectId), body('friend_id').exists().customSanitizer(sanitizers.toObjectId), this.friendController.blockFriend)


        // unblock a friend 
        this.router.put('/action/unblock', body('user_id').exists().customSanitizer(sanitizers.toObjectId), body('friend_id').exists().customSanitizer(sanitizers.toObjectId), this.friendController.unblockFriend)
    }
}

export default friendRouter;