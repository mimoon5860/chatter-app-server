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
const abstractController_1 = __importDefault(require("../abstracts/abstractController"));
const conversationServices_1 = __importDefault(require("../services/conversationServices"));
class conversationController extends abstractController_1.default {
    constructor() {
        super();
        this.conversationService = new conversationServices_1.default();
        // create conversation 
        this.createConversation = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.conversationService.createConversation(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(500).json(data);
            }
        }));
        // delete conversation 
        this.deleteConversation = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.conversationService.deleteConversation(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(500).json(data);
            }
        }));
        // get all conversations
        this.getAllConversation = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.conversationService.getAllConversation(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(500).json(data);
            }
        }));
    }
}
exports.default = conversationController;
//# sourceMappingURL=conversationController.js.map