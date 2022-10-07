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
const friendService_1 = __importDefault(require("../services/friendService"));
class friendController extends abstractController_1.default {
    constructor() {
        super(...arguments);
        this.friendService = new friendService_1.default();
        // get all friends 
        this.getAllFriends = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.friendService.getAllFriends(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(500).json(data);
            }
        }));
        // send friend request controller
        this.sendFriendRequest = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.friendService.sendFriendRequest(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
        // accept friend request controller
        this.acceptFriendRequest = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.friendService.acceptFriendRequest(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
        // cancel friend friend request controller
        this.cancelFriendRequest = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.friendService.cancelRequest(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
        // block friend  controller
        this.blockFriend = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.friendService.userBlockFriend(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
        // unblock friend  controller
        this.unblockFriend = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.friendService.userUnblockFriend(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
        // unfriend  controller
        this.unFriend = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.friendService.unFriend(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
    }
}
exports.default = friendController;
//# sourceMappingURL=friendController.js.map