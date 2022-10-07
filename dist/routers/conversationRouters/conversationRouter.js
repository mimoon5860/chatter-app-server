"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const abstractRouters_1 = __importDefault(require("../../abstracts/abstractRouters"));
const conversationController_1 = __importDefault(require("../../controllers/conversationController"));
const sanitizers_1 = __importDefault(require("../../utils/inputValidation/sanitizers"));
class conversationRouter extends abstractRouters_1.default {
    constructor() {
        super();
        this.conversationController = new conversationController_1.default();
        this.callRouters();
    }
    callRouters() {
        // get all conversation of an user 
        this.router.get('/get/all/:userId', (0, express_validator_1.param)('userId').customSanitizer(sanitizers_1.default.toObjectId), this.conversationController.getAllConversation);
        // create conversation 
        this.router.post('/create', (0, express_validator_1.body)('creator').customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('participant').isArray({ min: 2 }), this.conversationController.createConversation);
        // delete a conversation from an user
        this.router.delete('/delete', (0, express_validator_1.body)('conversation').customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('user').customSanitizer(sanitizers_1.default.toObjectId), this.conversationController.deleteConversation);
    }
}
exports.default = conversationRouter;
//# sourceMappingURL=conversationRouter.js.map