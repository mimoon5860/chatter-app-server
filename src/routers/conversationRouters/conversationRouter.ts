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

        // get all conversation of an user 
        this.router.get('/get/all/:userId', param('userId').customSanitizer(sanitizers.toObjectId), this.conversationController.getAllConversation);

        // create conversation 
        this.router.post('/create', body('creator').customSanitizer(sanitizers.toObjectId), body('participant').isArray({ min: 2 }), this.conversationController.createConversation);

        // delete a conversation from an user
        this.router.delete('/delete', body('conversation').customSanitizer(sanitizers.toObjectId), body('user').customSanitizer(sanitizers.toObjectId), this.conversationController.deleteConversation);
    }

}
export default conversationRouter;