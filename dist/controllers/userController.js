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
const userServices_1 = __importDefault(require("../services/userServices"));
class userController extends abstractController_1.default {
    constructor() {
        super(...arguments);
        this.userServices = new userServices_1.default();
        //Search an user by phone controller
        this.searchAnUser = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userServices.searchAnUser(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json(data);
            }
        }));
        // get an user controller 
        this.getAnUser = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userServices.getAnUserService(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(403).json(data);
            }
        }));
        // user upload avatar
        this.uploadUserAvatar = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userServices.uploadUserAvatar(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                if (req.upFiles) {
                    this.deleteFile.delete(req.upFolder, req.upFiles);
                }
                res.status(403).json(data);
            }
        }));
        // get simple user photo and name
        this.getUserNameAndPhoto = this.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userServices.getUserNameAndPhoto(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json(data);
            }
        }));
    }
}
exports.default = userController;
//# sourceMappingURL=userController.js.map