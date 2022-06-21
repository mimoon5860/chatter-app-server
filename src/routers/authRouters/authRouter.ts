import { Request, Response, Router } from "express";
import abstractRouter from "../../abstracts/abstractRouters";

class authRouter extends abstractRouter {
    constructor() {
        super();
        this.callRouter();
    }
    callRouter() {
        this.router.get('/router', (req: Request, res: Response) => {
            res.send('hello');
        })
    }
}
export default authRouter;