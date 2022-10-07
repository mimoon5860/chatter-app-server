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
const multer_1 = __importDefault(require("multer"));
const compressor_1 = __importDefault(require("../utils/compressor/compressor"));
const mimetype = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];
class uploader {
    constructor() {
        this.compressor = new compressor_1.default();
    }
    singleUploader(folder) {
        return ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const storage = multer_1.default.memoryStorage();
            const upload = (0, multer_1.default)({
                storage,
                limits: { fileSize: 5000000 },
                fileFilter: (_req, file, cb) => {
                    if (mimetype.includes(file.mimetype)) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Invalid file type!'));
                    }
                }
            });
            upload.single('photo')(req, res, (err) => {
                if (err) {
                    next(new Error('Upload failed'));
                }
                else {
                    req.upFolder = folder;
                    this.compressor.compress(folder)(req, res, next);
                }
            });
        }));
    }
    multiUploader(folder) {
        return ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const storage = multer_1.default.memoryStorage();
            const upload = (0, multer_1.default)({
                storage,
                limits: { fileSize: 5000000 },
                fileFilter: (_req, file, cb) => {
                    if (mimetype.includes(file.mimetype)) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Invalid file type!'));
                    }
                }
            });
            upload.any()(req, res, (err) => {
                if (err) {
                    next(new Error('Upload failed'));
                }
                else {
                    req.upFolder = folder;
                    this.compressor.compress(folder)(req, res, next);
                }
            });
        }));
    }
}
exports.default = uploader;
//# sourceMappingURL=uploader.js.map