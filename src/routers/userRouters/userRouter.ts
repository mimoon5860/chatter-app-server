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
        // Search and find an user by phone 
        this.router.get('/search/:phone', param('phone').isString().isLength({ min: 11 }), this.userController.searchAnUser)

        //get an user router
        this.router.get('/get/:viewer/:user', param('viewer').customSanitizer(sanitizers.toObjectId), param('user').customSanitizer(sanitizers.toObjectId), this.userController.getAnUser);

        this.router.post('/upload/avatar/:id', param('id').customSanitizer(sanitizers.toObjectId), this.uploader.singleUploader('avatars'), this.userController.uploadUserAvatar)
    }
}

export default userRouter;