"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const abstractRouters_1 = __importDefault(require("../../abstracts/abstractRouters"));
const friendController_1 = __importDefault(require("../../controllers/friendController"));
const sanitizers_1 = __importDefault(require("../../utils/inputValidation/sanitizers"));
class friendRouter extends abstractRouters_1.default {
    constructor() {
        super();
        this.friendController = new friendController_1.default();
        this.callRouter();
    }
    callRouter() {
        // get all friend
        this.router.get('/get/all/friends/:uid', (0, express_validator_1.param)('uid').exists().customSanitizer(sanitizers_1.default.toObjectId), this.friendController.getAllFriends);
        // send request for add friend router
        this.router.post('/send/request', this.checkToken.tokenCheck, (0, express_validator_1.body)('sender_id').exists().customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('receiver_id').exists().customSanitizer(sanitizers_1.default.toObjectId), this.friendController.sendFriendRequest);
        // accept friend request
        this.router.put('/accept/request', (0, express_validator_1.body)('requester').exists().customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('receiver').exists().customSanitizer(sanitizers_1.default.toObjectId), this.friendController.acceptFriendRequest);
        // cancel friend request
        this.router.put('/cancel/request', (0, express_validator_1.body)('user_id').exists().customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('friend_id').exists().customSanitizer(sanitizers_1.default.toObjectId), this.friendController.cancelFriendRequest);
        // unfriend a friend 
        this.router.put('/action/unfriend', (0, express_validator_1.body)('user_id').exists().customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('friend_id').exists().customSanitizer(sanitizers_1.default.toObjectId), this.friendController.unFriend);
        // block a friend 
        this.router.put('/action/block', (0, express_validator_1.body)('user_id').exists().customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('friend_id').exists().customSanitizer(sanitizers_1.default.toObjectId), this.friendController.blockFriend);
        // unblock a friend 
        this.router.put('/action/unblock', (0, express_validator_1.body)('user_id').exists().customSanitizer(sanitizers_1.default.toObjectId), (0, express_validator_1.body)('friend_id').exists().customSanitizer(sanitizers_1.default.toObjectId), this.friendController.unblockFriend);
    }
}
exports.default = friendRouter;
//# sourceMappingURL=friendRouter.js.map