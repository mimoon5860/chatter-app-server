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
class friendService extends db_1.default {
    constructor() {
        super();
        // get all friends 
        this.getAllFriends = (req) => __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const friendsCollection = this.friendsCollection();
            const checkUser = yield friendsCollection.find({ $and: [{ userId: uid }, { type: 'friend' }] }).select({ friendId: 1 });
            const checkFriend = yield friendsCollection.find({ $and: [{ friendId: uid }, { type: 'friend' }] }).select({ userId: 1 });
            if (checkUser.length) {
                return { success: true, data: checkUser };
            }
            else if (checkFriend.length) {
                return { success: true, data: checkFriend };
            }
            return { success: true, data: [] };
        });
        // send friend request service
        this.sendFriendRequest = (req) => __awaiter(this, void 0, void 0, function* () {
            const { sender_id, receiver_id, note } = req.body;
            const friendsCollection = this.friendsCollection();
            const checkFromSender = yield friendsCollection.findOne({ userId: sender_id, friendId: receiver_id }).select({});
            const checkFromReceiver = yield friendsCollection.findOne({ userId: receiver_id, friendId: sender_id });
            if (!checkFromSender && !checkFromReceiver) {
                const result = new friendsCollection({ userId: sender_id, friendId: receiver_id, note, type: 'requested' });
                yield result.save();
                return { success: true, msg: 'Friend request send successfully' };
            }
            else if (checkFromSender) {
                return { success: false, msg: `You Already ${checkFromSender.type}` };
            }
            else if (checkFromReceiver) {
                return { success: false, msg: `He Already ${checkFromReceiver.type}` };
            }
            else {
                return { success: false, msg: 'Cannot Send Request now!' };
            }
        });
        // accept friend request service
        this.acceptFriendRequest = (req) => __awaiter(this, void 0, void 0, function* () {
            const { requester, receiver } = req.body;
            const friendsCollection = this.friendsCollection();
            const check = yield friendsCollection.findOne({ userId: requester, friendId: receiver }).select({ type: 1 });
            if (check.type === 'requested') {
                const result = yield friendsCollection.findByIdAndUpdate(check._id, { type: 'friend' }, { new: true }).select({ type: 1 });
                if (result.type === 'friend') {
                    return { success: true, msg: 'Friend request accept successfully!' };
                }
                else {
                    return { success: false, msg: 'Cannot accept Request now!' };
                }
            }
            else {
                return { success: false, msg: 'Cannot accept Request now!' };
            }
        });
        // cancel friend request service
        this.cancelRequest = (req) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, friend_id } = req.body;
            const friendsCollection = this.friendsCollection();
            const checkFromUser = yield friendsCollection.findOne({ userId: friend_id, friendId: user_id }).select({ type: 1 });
            if (checkFromUser.type === 'requested') {
                const result = yield friendsCollection.deleteOne({ _id: checkFromUser._id });
                if (result.deletedCount) {
                    return { success: true, msg: 'Cancel friend request successful!' };
                }
                else {
                    return { success: false, msg: 'Cannot cancel friend request now!' };
                }
            }
            else {
                return { success: false, msg: 'Invalid id or relationship!' };
            }
        });
        // block user service
        this.userBlockFriend = (req) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, friend_id } = req.body;
            const friendsCollection = this.friendsCollection();
            const checkFromUser = yield friendsCollection.findOne({ userId: user_id, friendId: friend_id }).select({ type: 1 });
            const checkFromFriend = yield friendsCollection.findOne({ userId: friend_id, friendId: user_id }).select({ type: 1 });
            if ((checkFromUser === null || checkFromUser === void 0 ? void 0 : checkFromUser.type) === 'friend' || (checkFromFriend === null || checkFromFriend === void 0 ? void 0 : checkFromFriend.type) === 'friend' || ((checkFromUser === null || checkFromUser === void 0 ? void 0 : checkFromUser.type) === null && (checkFromFriend === null || checkFromFriend === void 0 ? void 0 : checkFromFriend.type) === null)) {
                const result = yield friendsCollection.findByIdAndUpdate(checkFromUser._id || checkFromFriend._id, { type: "blocked", userId: user_id, friendId: friend_id }, { new: true }).select({ type: 1 });
                if (result.type === 'blocked') {
                    return { success: true, msg: 'User blocked successful!' };
                }
                else {
                    return { success: false, msg: 'Cannot block user now!' };
                }
            }
            else {
                return { success: false, msg: 'Invalid id or relationship!' };
            }
        });
        // unblock service
        this.userUnblockFriend = (req) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, friend_id } = req.body;
            const friendsCollection = this.friendsCollection();
            const checkFromUser = yield friendsCollection.findOne({ userId: user_id, friendId: friend_id }).select({ type: 1 });
            if (checkFromUser.type === 'blocked') {
                const result = yield friendsCollection.deleteOne({ _id: checkFromUser._id });
                if (result.deletedCount) {
                    return { success: true, msg: 'User unblocked successful!' };
                }
                else {
                    return { success: false, msg: 'Cannot unblock user now!' };
                }
            }
            else {
                return { success: false, msg: 'Invalid id or relationship!' };
            }
        });
        // unfriend service
        this.unFriend = (req) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, friend_id } = req.body;
            const friendsCollection = this.friendsCollection();
            const checkFromUser = yield friendsCollection.findOne({ userId: user_id, friendId: friend_id }).select({ type: 1 });
            const checkFromFriend = yield friendsCollection.findOne({ userId: friend_id, friendId: user_id }).select({ type: 1 });
            if ((checkFromUser === null || checkFromUser === void 0 ? void 0 : checkFromUser.type) === 'friend' || (checkFromFriend === null || checkFromFriend === void 0 ? void 0 : checkFromFriend.type) === 'friend') {
                const result = yield friendsCollection.deleteOne({ _id: checkFromUser._id });
                if (result.deletedCount) {
                    return { success: true, msg: 'User unfriend successful!' };
                }
                else {
                    return { success: false, msg: 'Cannot unfriend user now!' };
                }
            }
            else {
                return { success: false, msg: 'Invalid id or relationship!' };
            }
        });
    }
}
exports.default = friendService;
//# sourceMappingURL=friendService.js.map