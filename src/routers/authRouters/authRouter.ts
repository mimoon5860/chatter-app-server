import { Request, Response, Router } from "express";

class authRouter {
    router = Router();
    constructor() {
        this.callRouter();
    }
    callRouter() {
        this.router.get('/router', (req: Request, res: Response) => {
            res.send('hello');
        })
    }
}
export default authRouter;