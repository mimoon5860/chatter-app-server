import { NextFunction, Request, Response } from "express";
import multer from 'multer';
import path from "path";

const mimetype = ['image/jpg', 'image/png', 'image/jpeg']

class uploader {
    public singleUploader(folder: string) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `dist/uploads/${folder}`);
            },
            filename: (req, file, cb) => {
                const fileExt = path.extname(file.originalname);
                const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("_") + "-" + Date.now();
                console.log({ fileName });
                cb(null, fileName + fileExt);
            }
        })

        const upload = multer({
            storage: storage,
            limits: { fileSize: 5000000 },
            fileFilter: (req, file, cb) => {
                if (mimetype.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type!'))
                }
            }
        })

        return upload.single('photo');
    }
}

export default uploader;