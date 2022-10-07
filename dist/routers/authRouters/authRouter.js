"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const abstractRouters_1 = __importDefault(require("../../abstracts/abstractRouters"));
const authController_1 = __importDefault(require("../../controllers/authController"));
class authRouter extends abstractRouters_1.default {
    constructor() {
        super();
        this.authController = new authController_1.default;
        this.callRouter();
    }
    //call all router
    callRouter() {
        // create new user 
        this.router.post('/user/signup', (0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('phone').isString().isLength({ min: 11 }), (0, express_validator_1.body)('password').isLength({ min: 8 }), this.authController.signupController);
        // login user
        this.router.post('/user/login', (0, express_validator_1.body)('phone').isString().isLength({ min: 11 }), (0, express_validator_1.body)('password').isLength({ min: 8 }), this.authController.loginUser);
    }
}
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map