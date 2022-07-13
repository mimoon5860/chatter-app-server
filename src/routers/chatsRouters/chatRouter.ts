import { body } from "express-validator";
import abstractRouter from "../../abstracts/abstractRouters";
import chatsController from "../../controllers/chatsController";
import sanitizers from "../../utils/inputValidation/sanitizers";

class chatRouter extends abstractRouter {
    private chatsController = new chatsController();
    constructor() {
        super();
        this.callRouters();
    }
    private callRouters() {
        this.router.post('/send/msg', body('senderId').exists().customSanitizer(sanitizers.toObjectId), body('receiverId').exists().customSanitizer(sanitizers.toObjectId), this.chatsController.sendMsgController);
    }
}

export default chatRouter;