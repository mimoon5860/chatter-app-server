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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../model/db"));
const lib_1 = __importDefault(require("../utils/lib/lib"));
class authServices extends db_1.default {
    constructor() {
        super();
        // sign up service
        this.signupService = (req) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const userCollection = this.userCollection();
            const check = yield userCollection.find({ phone: user.phone });
            if (check.length) {
                return { success: false, msg: 'Phone already exist!' };
            }
            else {
                const hashedPass = yield lib_1.default.hashPass(user.password);
                const result = new userCollection(Object.assign(Object.assign({}, user), { password: hashedPass }));
                yield result.save();
                return { success: true, userId: result._id };
            }
        });
        // Login service
        this.loginService = (req) => __awaiter(this, void 0, void 0, function* () {
            const creds = req.body;
            const userCollection = this.userCollection();
            const checkUser = yield userCollection.findOne({ phone: creds.phone });
            if (checkUser) {
                const _a = checkUser._doc, { password, __v } = _a, rest = __rest(_a, ["password", "__v"]);
                const passCheck = yield lib_1.default.compare(creds.password, password);
                if (passCheck) {
                    return { success: true, data: rest };
                }
                else {
                    return { success: false, msg: "Wrong password!" };
                }
            }
            else {
                return { success: false, msg: "Wrong phone number!" };
            }
        });
    }
}
exports.default = authServices;
//# sourceMappingURL=authService.js.map