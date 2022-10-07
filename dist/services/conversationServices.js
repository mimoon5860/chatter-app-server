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
class conversationService extends db_1.default {
    constructor() {
        super(...arguments);
        // make a conversation 
        this.createConversation = (req) => __awaiter(this, void 0, void 0, function* () {
            let check = null;
            const conversationCollection = this.conversationCollection();
            if (req.body.participant.length === 2) {
                check = yield conversationCollection.findOne({ $and: [{ 'participant': { $in: req.body.participant[0] } }, { 'participant': { $in: req.body.participant[1] } }, { 'type': 'personal' }] }).select({ _id: 1 });
                if (check) {
                    return { success: true, conversation: check._id };
                }
                else {
                    const data = new conversationCollection(Object.assign(Object.assign({}, req.body), { type: 'personal' }));
                    const result = yield data.save();
                    return { success: true, conversation: result._id };
                }
            }
            else {
                return { success: true };
            }
        });
        // delete conversation 
        this.deleteConversation = (req) => __awaiter(this, void 0, void 0, function* () {
            const { conversation, user } = req.body;
            const conversationCollection = this.conversationCollection();
            const result = yield conversationCollection.updateOne({ _id: conversation }, { $pull: { participant: user } }, { new: true });
            if (result.modifiedCount) {
                return { success: true, msg: "Conversation Deleted successfully!" };
            }
            else {
                return { success: false, msg: "Something is wrong!" };
            }
        });
        //  get all conversations of an user 
        this.getAllConversation = (req) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            console.log({ userId });
            const conversationCollection = this.conversationCollection();
            const data = yield conversationCollection.find({ participant: userId }).select({ createdAt: 0, updatedAt: 0, __v: 0 });
            console.log({ data });
            return { success: true, data };
        });
    }
}
exports.default = conversationService;
//# sourceMappingURL=conversationServices.js.map