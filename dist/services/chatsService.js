"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../model/db"));
class chatService extends db_1.default {
    constructor() {
        super();
        // send msgs
        this.sendMsg = (req) => __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            console.log(req.body.conversation, req.body.message);
            if (req.upFiles) {
                body = Object.assign(Object.assign({}, body), { file: req.upFiles });
            }
            const chatCollection = this.chatCollection();
            const conversationCollection = this.conversationCollection();
            const res = yield conversationCollection.findByIdAndUpdate({ _id: req.body.conversation }, { lastMsg: req.body.message }, { new: true });
            console.log({ res });
            const data = new chatCollection(body);
            const msg = yield data.save();
            if (msg._id) {
                return { success: true, msg: "Message has been send successfully!" };
            }
            else {
                return { success: false, msg: "Something is wrong!" };
            }
        });
        // get all msg of a conversation
        this.getMsgsOfConvo = (req) => __awaiter(this, void 0, void 0, function* () {
            const { conversation } = req.params;
            const chatCollection = this.chatCollection();
            const data = yield chatCollection.find({ conversation }, { __v: 0 });
            return {
                success: true, data
            };
        });
    }
}
exports.default = chatService;
//# sourceMappingURL=chatsService.js.map