import { NextFunction, Request, Response } from "express";
import multer from 'multer';
import compressor from "../utils/compressor/compressor";
import { CustomRequest } from "../utils/types/types";



const mimetype = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];

class uploader {
    private compressor = new compressor();

    public singleUploader(folder: string) {
        return (async (req: CustomRequest, res: Response, next: NextFunction) => {
            const storage = multer.memoryStorage();
            const upload = multer({
                storage,
                limits: { fileSize: 5000000 },
                fileFilter: (_req, file, cb) => {
                    if (mimetype.includes(file.mimetype)) {
                        cb(null, true);
                    } else {
                        cb(new Error('Invalid file type!'))
                    }
                }
            })

            upload.single('photo')(req, res, (err: any) => {
                if (err) {
                    next(new Error('Upload failed'));
                } else {
                    req.upFolder = folder;

                    this.compressor.compress(folder)(req, res, next);
                }
            });
        })
    }


    public multiUploader(folder: string) {
        return (
            async (req: CustomRequest, res: Response, next: NextFunction) => {

                const storage = multer.memoryStorage();
                const upload = multer({
                    storage,
                    limits: { fileSize: 5000000 },
                    fileFilter: (_req, file, cb) => {
                        if (mimetype.includes(file.mimetype)) {
                            cb(null, true);
                        } else {
                            cb(new Error('Invalid file type!'))
                        }
                    }
                })

                upload.any()(req, res, (err: any) => {
                    if (err) {
                        next(new Error('Upload failed'));
                    } else {
                        req.upFolder = folder;

                        this.compressor.compress(folder)(req, res, next);
                    }
                });



            }
        )
    }
}

export default uploader;