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
class userServices extends db_1.default {
    constructor() {
        super();
        // search an user by phone 
        this.searchAnUser = (req) => __awaiter(this, void 0, void 0, function* () {
            const { phone } = req.params;
            const userCollection = this.userCollection();
            const user = yield userCollection.findOne({ phone }).select({ name: 1, phone: 1, photo: 1 });
            if (user) {
                return { success: true, data: user };
            }
            else {
                return { success: false, msg: "Cannot found any user with this phone" };
            }
        });
        // get an user service
        this.getAnUserService = (req) => __awaiter(this, void 0, void 0, function* () {
            const { viewer, user } = req.params;
            const userCollection = this.userCollection();
            const friendsCollection = this.friendsCollection();
            const checkFromViewer = yield friendsCollection.findOne({ userId: viewer, friendId: user }).select({ type: 1 });
            const checkFromUser = yield friendsCollection.findOne({ userId: user, friendId: viewer }).select({ type: 1 });
            const userData = yield userCollection.findById(user).select({ password: 0, verified: 0, createdAt: 0, updatedAt: 0, __v: 0 });
            if (checkFromViewer) {
                switch (checkFromViewer.type) {
                    case "friend":
                        return { success: true, data: userData, type: "friend" };
                    case "requested":
                        return { success: true, data: userData, type: "requesting" };
                    case "blocked":
                        return { success: true, data: userData, type: "blocking" };
                    default:
                        return { success: false, msg: 'Something is wrong!' };
                }
            }
            else if (checkFromUser) {
                switch (checkFromUser.type) {
                    case "friend":
                        return { success: true, data: userData, type: "friend" };
                    case "requested":
                        return { success: true, data: userData, type: "requested" };
                    case "blocked":
                        return { success: true, type: "blocked" };
                    default:
                        return { success: false, msg: 'Something is wrong!' };
                }
            }
            else {
                if (userData) {
                    return { success: true, data: userData };
                }
                else {
                    return { success: false, msg: 'Something is wrong!' };
                }
            }
        });
        // user upload avatar
        this.uploadUserAvatar = (req) => __awaiter(this, void 0, void 0, function* () {
            const userCollection = this.userCollection();
            yield userCollection.findByIdAndUpdate({ _id: req.params.id }, { photo: req.upFiles }, { new: true });
            return { success: true, msg: 'Photo update successfully!' };
        });
        // get user pic and name simple
        this.getUserNameAndPhoto = (req) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log({ id });
            const userCollection = this.userCollection();
            const userData = yield userCollection.findById(id).select({ name: 1, photo: 1 });
            console.log({ userData });
            if (userData) {
                return { success: true, data: userData, msg: "User photo and name get successful" };
            }
            else {
                return {
                    success: false, msg: "Cannot find user with this id"
                };
            }
        });
    }
}
exports.default = userServices;
//# sourceMappingURL=userServices.js.map