"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
class errorHandle {
    error(err, _req, res, _next) {
        if (err) {
            if (err instanceof multer_1.default.MulterError) {
                res.status(400).json(err.message || 'Internal server error');
            }
            else {
                res.status(err.code || 500).json(err.message || 'Internal server error');
            }
        }
    }
}
exports.default = errorHandle;
//# sourceMappingURL=errorHandler.js.map