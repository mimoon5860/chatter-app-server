import { Request, Response } from "express";

class notFound {
    public notFound(_req: Request, res: Response) {
        res.status(404).send("Invalid route");
    }
}

export default notFound;