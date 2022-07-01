import { body } from "express-validator";
import abstractRouter from "../../abstracts/abstractRouters";
import authController from "../../controllers/authController";

class authRouter extends abstractRouter {
    private authcontroller = new authController;
    constructor() {
        super();
        this.callRouter();
    }

    //call all router
    callRouter() {
        this.router.post('/user/signup',
            body('name').isString(),
            body('phone').isString().isLength({ min: 11 }),
            body('password').isLength({ min: 8 }),
            this.authcontroller.signupController);
    }
}
export default authRouter;