import { Router } from "express";
import tokenCheck from "../middleware/tokenCheck";
import uploader from "../middleware/uploader";

class abstractRouter {
    readonly router = Router();
    public checkToken = new tokenCheck();
    public uploader = new uploader();

}

export default abstractRouter;