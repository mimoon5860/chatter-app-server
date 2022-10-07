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
const express_validator_1 = require("express-validator");
const deleteFIle_1 = __importDefault(require("../utils/fileRemover/deleteFIle"));
class abstractController {
    constructor() {
        this.deleteFile = new deleteFIle_1.default();
    }
    // wrap for handle async error 
    wrap(cb) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    if (req.upFiles) {
                        this.deleteFile.delete(req.upFolder, req.upFiles);
                    }
                    res.status(400).json({ success: false, errors: errors.array() });
                }
                else {
                    yield cb(req, res, next);
                }
            }
            catch (err) {
                if (req.upFiles) {
                    this.deleteFile.delete(req.upFolder, req.upFiles);
                }
                next(err);
            }
        });
    }
}
exports.default = abstractController;
//# sourceMappingURL=abstractController.js.map