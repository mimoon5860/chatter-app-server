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
const lib_1 = __importDefault(require("../utils/lib/lib"));
class tokenCheck {
    tokenCheck(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyToken = yield lib_1.default.verifyToken(req.cookies.token);
            if (verifyToken) {
                next();
            }
            else {
                res.status(400).send('Unable to verify token! Please Login.');
            }
        });
    }
}
exports.default = tokenCheck;
//# sourceMappingURL=tokenCheck.js.map