import { NextFunction, Request, Response } from "express";
import sharp from 'sharp'

class compressor {

    // compress images
    public compress(folderPath: string) {
        return (
            async (req: Request, _res: Response, next: NextFunction) => {
                try {
                    const uploadsFolder = `${__dirname}/../../uploads/${folderPath}`;
                    const isArray =
                        Object.prototype.toString.call(req.files) === '[object Array]';

                    if (req.file) {
                        const { buffer } = req.file;

                        const uniqueName =
                            Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';

                        const checkImg = await sharp(buffer).metadata();

                        const { width, height } = checkImg;

                        let size: [number | null, number | null];

                        if (width && height) {
                            // if the width and height is not undefined then proceed further
                            if (width > height) {
                                size = [500, null];
                            } else {
                                size = [null, 500];
                            }

                            await sharp(buffer)
                                .resize(...size, {
                                    // background: { r: 255, g: 255, b: 255, alpha: 1 },
                                    fit: 'contain',
                                })
                                .toFormat('webp')
                                .withMetadata()
                                .toFile(`${uploadsFolder}/${uniqueName}`);

                            req.file.filename = uniqueName;
                        }

                        next();
                    } else if (req.files && isArray && req.files?.length > 0) {
                        // iterate the files for compressing

                        const files = req.files as Express.Multer.File[];

                        for (let i = 0; i < req.files.length; i++) {
                            const { buffer } = files[i];

                            const uniqueName =
                                Date.now() + '-' + Math.round(Math.random() * 1e9) + '.webp';

                            const checkImg = await sharp(buffer).metadata();

                            const { width, height } = checkImg;

                            let size: [number | null, number | null];

                            if (width && height) {
                                // if the width and height is not undefined then proceed further
                                if (width > height) {
                                    size = [500, null];
                                } else {
                                    size = [null, 500];
                                }

                                await sharp(buffer)
                                    .resize(...size, {
                                        fit: 'contain',
                                    })
                                    .rotate()
                                    .toFormat('webp')
                                    .toFile(`${uploadsFolder}/${uniqueName}`);

                                files[i].filename = uniqueName;
                            }
                        }

                        req.files = files;

                        // send to the next middleware when compression is done
                        next();
                    } else {
                        // if there are no image to compress then call send to the next middleware
                        next();
                    }

                } catch (err) {
                    next(err);
                }
            }
        )
    }
}

export default compressor;