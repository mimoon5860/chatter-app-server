import authRouter from "./authRouters/authRouter";

class allRouters {
    public authRouter = new authRouter().router;
}

export default allRouters;