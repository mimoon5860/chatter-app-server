import { body, param } from "express-validator";
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

        this.router.post('/create', body('creator').customSanitizer(sanitizers.toObjectId), body('participant').isArray({ min: 2 }), this.conversationController.createConversation)
    }

}
export default conversationRouter;