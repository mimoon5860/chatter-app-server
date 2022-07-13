import { param } from "express-validator";
import abstractRouter from "../../abstracts/abstractRouters";
import conversationController from "../../controllers/conversationController";
import sanitizers from "../../utils/inputValidation/sanitizers";

class conversationRouter extends abstractRouter {
    private conversationController = new conversationController();
    constructor() {
        super();

        this.callRouters();
    }
    private callRouters() {
        this.router.get('/get/all/:userId', param('userId').customSanitizer(sanitizers.toObjectId), this.conversationController.getAllConversation);

    }

}
export default conversationRouter;