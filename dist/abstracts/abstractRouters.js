"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenCheck_1 = __importDefault(require("../middleware/tokenCheck"));
const uploader_1 = __importDefault(require("../middleware/uploader"));
class abstractRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.checkToken = new tokenCheck_1.default();
        this.uploader = new uploader_1.default();
    }
}
exports.default = abstractRouter;
//# sourceMappingURL=abstractRouters.js.map