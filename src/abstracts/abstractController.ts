import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import DeleteFile from "../utils/fileRemover/deleteFIle";
import { CustomRequest, func } from "../utils/types/types";

class abstractController {
    public deleteFile = new DeleteFile();

    // wrap for handle async error 
    public wrap(cb: func) {
        return async (req: CustomRequest, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    if (req.upFiles) {
                        this.deleteFile.delete(req.upFolder, req.upFiles);
                    }
                    res.status(400).json({ success: false, errors: errors.array() });
                } else {
                    await cb(req, res, next);
                }
            } catch (err: any) {
                if (req.upFiles) {
                    this.deleteFile.delete(req.upFolder, req.upFiles);
                }
                next(err);
            }
        };
    }
}

export default abstractController;