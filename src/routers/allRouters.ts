import authRouter from "./authRouters/authRouter";
import userRouter from "./userRouters/userRouter";

class allRouters {
    public authRouter = new authRouter().router;
    public userRouter = new userRouter().router;
}

export default allRouters;