"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const abstractRouters_1 = __importDefault(require("../../abstracts/abstractRouters"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const checkFiles_1 = __importDefault(require("../../middleware/checkFiles"));
const sanitizers_1 = __importDefault(require("../../utils/inputValidation/sanitizers"));
class userRouter extends abstractRouters_1.default {
    constructor() {
        super();
        this.userController = new userController_1.default();
        this.callRouter();
    }
    callRouter() {
        // Search and find an user by phone 
        this.router.get('/search/:phone', (0, express_validator_1.param)('phone').isString().isLength({ min: 11 }), this.userController.searchAnUser);
        //get an user router
        this.router.get('/get/:viewer/:user', (0, express_validator_1.param)('viewer').customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.param)('user').customSanitizer(sanitizers_1.default.toObjectId), this.userController.getAnUser);
        // upload user avatar 
        this.router.post('/upload/avatar/:id', (0, express_validator_1.param)('id').customSanitizer(sanitizers_1.default.toObjectId), this.uploader.singleUploader('avatars'), checkFiles_1.default.checkSingleFile, this.userController.uploadUserAvatar);
        // get user simple photo and name 
        this.router.get('/get/user/name-photo/:id', (0, express_validator_1.param)('id').customSanitizer(sanitizers_1.default.toObjectId), this.userController.getUserNameAndPhoto);
    }
}
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map