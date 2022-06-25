import { Request, Response, Router } from "express";
import abstractRouter from "../../abstracts/abstractRouters";
import authController from "../../controllers/authController";

class authRouter extends abstractRouter {
    private authcontroller = new authController;
    constructor() {
        super();
        this.callRouter();
    }
    callRouter() {
        this.router.get('/router', this.authcontroller.signupController);
    }
}
export default authRouter;