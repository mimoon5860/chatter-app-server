"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const abstractRouters_1 = __importDefault(require("../../abstracts/abstractRouters"));
const chatsController_1 = __importDefault(require("../../controllers/chatsController"));
const sanitizers_1 = __importDefault(require("../../utils/inputValidation/sanitizers"));
class chatRouter extends abstractRouters_1.default {
    constructor() {
        super();
        this.chatsController = new chatsController_1.default();
        this.callRouters();
    }
    callRouters() {
        // send msg 
        this.router.post('/send/msg', this.uploader.multiUploader('chat-images'), (0, express_validator_1.body)('senderId').exists().customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('conversation').exists().customSanitizer(sanitizers_1.default.toObjectId), this.chatsController.sendMsgController);
        // get all msgs of a conversation 
        this.router.get('/get/msgs/:conversation', (0, express_validator_1.param)('conversation').exists().customSanitizer(sanitizers_1.default.toObjectId), this.chatsController.getMsgsOfConvo);
    }
}
exports.default = chatRouter;
//# sourceMappingURL=chatRouter.js.map