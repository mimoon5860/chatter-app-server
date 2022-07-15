import { Request, Response } from "express";
import abstractController from "../abstracts/abstractController";
import friendService from "../services/friendService";

class friendController extends abstractController {
    private friendService = new friendService();

    // send friend request controller
    public sendFriendRequest = this.wrap(async (req: Request, res: Response) => {
        const data = await this.friendService.sendFriendRequest(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }
    }
    )

    // accept friend request controller
    public acceptFriendRequest = this.wrap(async (req: Request, res: Response) => {
        const data = await this.friendService.acceptFriendRequest(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }

    })

    // cancel friend friend request controller
    public cancelFriendRequest = this.wrap(async (req: Request, res: Response) => {

        const data = await this.friendService.cancelRequest(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }

    })


    // block friend  controller
    public blockFriend = this.wrap(async (req: Request, res: Response) => {
        const data = await this.friendService.userBlockFriend(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }

    })


    // unblock friend  controller
    public unblockFriend = this.wrap(async (req: Request, res: Response) => {
        const data = await this.friendService.userUnblockFriend(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }

    })


    // unfriend  controller
    public unFriend = this.wrap(async (req: Request, res: Response) => {

        const data = await this.friendService.unFriend(req);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }

    })
}

export default friendController;