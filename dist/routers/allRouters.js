"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouters/authRouter"));
const chatRouter_1 = __importDefault(require("./chatsRouters/chatRouter"));
const conversationRouter_1 = __importDefault(require("./conversationRouters/conversationRouter"));
const friendRouter_1 = __importDefault(require("./friendRouters/friendRouter"));
const userRouter_1 = __importDefault(require("./userRouters/userRouter"));
class allRouters {
    constructor() {
        this.authRouter = new authRouter_1.default().router;
        this.userRouter = new userRouter_1.default().router;
        this.friendRouter = new friendRouter_1.default().router;
        this.chatRouter = new chatRouter_1.default().router;
        this.conversationRouter = new conversationRouter_1.default().router;
    }
}
exports.default = allRouters;
//# sourceMappingURL=allRouters.js.map