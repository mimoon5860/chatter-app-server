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
const chatsService_1 = __importDefault(require("../services/chatsService"));
class chatsController extends abstractController_1.default {
    constructor() {
        super();
        this.chatService = new chatsService_1.default();
        // send sms controller 
        this.sendMsgController = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.chatService.sendMsg(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                if (req.upFiles) {
                    this.deleteFile.delete(req.upFolder, req.upFiles);
                }
                res.status(500).json(data);
            }
        }));
        // get all msgs of a conversation controller
        this.getMsgsOfConvo = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.chatService.getMsgsOfConvo(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(500).json(data);
            }
        }));
    }
}
exports.default = chatsController;
//# sourceMappingURL=chatsController.js.map