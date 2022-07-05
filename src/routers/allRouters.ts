import authRouter from "./authRouters/authRouter";
import friendRouter from "./friendRouters/friendRouter";
import userRouter from "./userRouters/userRouter";

class allRouters {
    public authRouter = new authRouter().router;
    public userRouter = new userRouter().router;
    public friendRouter = new friendRouter().router;
}

export default allRouters;