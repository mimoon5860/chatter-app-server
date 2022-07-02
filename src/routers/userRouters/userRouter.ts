import { param } from "express-validator";
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
        this.router.get('/get/user/:id', param('id').customSanitizer(sanitizers.toObjectId), this.userController.getAnUser);
    }
}

export default userRouter;