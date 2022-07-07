import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import friendService from "../services/friendService";

class friendController {
    private friendService = new friendService();

    // send friend request controller
    public sendFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.friendService.sendFriendRequest(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }

    // accept friend request controller
    public acceptFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.friendService.acceptFriendRequest(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }

    // cancel friend friend request controller
    public cancelFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.friendService.cancelRequest(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }


    // block friend  controller
    public blockFriend = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.friendService.userBlockFriend(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }


    // unblock friend  controller
    public unblockFriend = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.friendService.userUnblockFriend(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }


    // unfriend  controller
    public unFriend = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
            } else {
                const data = await this.friendService.unFriend(req);
                if (data.success) {
                    res.status(200).json(data);
                } else {
                    res.status(403).json(data);
                }
            }
        } catch (err) {
            next(err);
        }
    }
}

export default friendController;