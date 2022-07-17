import { NextFunction, Request, Response } from "express";

class checkFiles {
    public static checkSingleFile(req: Request, res: Response, next: NextFunction) {
        if (req.file) {
            next();
        } else {
            res.status(404).json({
                success: false,
                error:
                {
                    msg: "Invalid value",
                    param: "photo",
                    location: "body"
                }

            });
        }
    }
    public static checkMultiFile(req: Request, res: Response, next: NextFunction) {
        if (req.files.length) {
            next();
        } else {
            res.status(404).json({
                success: false,
                error: "File required for this request!"

            });
        }
    }
}

export default checkFiles;