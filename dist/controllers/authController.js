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
const authService_1 = __importDefault(require("../services/authService"));
const lib_1 = __importDefault(require("../utils/lib/lib"));
class authController extends abstractController_1.default {
    constructor() {
        super(...arguments);
        this.authServices = new authService_1.default();
        //signup new user
        this.signupController = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.authServices.signupService(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
        // Login user
        this.loginUser = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.authServices.loginService(req);
            if (data.success) {
                const token = yield lib_1.default.makeToken(data.data);
                res.cookie('token', token);
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
    }
}
exports.default = authController;
//# sourceMappingURL=authController.js.map