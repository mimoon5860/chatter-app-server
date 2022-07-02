import { body } from "express-validator";
import abstractRouter from "../../abstracts/abstractRouters";
import authController from "../../controllers/authController";

class authRouter extends abstractRouter {
    private authController = new authController;
    constructor() {
        super();
        this.callRouter();
    }

    //call all router
    callRouter() {

        // create new user 
        this.router.post('/user/signup',
            body('name').isString(),
            body('phone').isString().isLength({ min: 11 }),
            body('password').isLength({ min: 8 }),
            this.authController.signupController);

        // login user
        this.router.post('/user/login', body('phone').isString().isLength({ min: 11 }), body('password').isLength({ min: 8 }), this.authController.loginUser)
    }
}
export default authRouter;