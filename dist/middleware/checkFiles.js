"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class checkFiles {
    static checkSingleFile(req, res, next) {
        if (req.file) {
            next();
        }
        else {
            res.status(404).json({
                success: false,
                error: {
                    msg: "Invalid value",
                    param: "photo",
                    location: "body"
                }
            });
        }
    }
    static checkMultiFile(req, res, next) {
        if (req.files.length) {
            next();
        }
        else {
            res.status(404).json({
                success: false,
                error: "File required for this request!"
            });
        }
    }
}
exports.default = checkFiles;
//# sourceMappingURL=checkFiles.js.map