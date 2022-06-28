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
        this.router.post('/user/signup', this.authcontroller.signupController);
    }
}
export default authRouter;