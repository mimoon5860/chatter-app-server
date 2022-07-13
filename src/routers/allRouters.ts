import authRouter from "./authRouters/authRouter";
import chatRouter from "./chatsRouters/chatRouter";
import conversationRouter from "./conversationRouters/conversationRouter";
import friendRouter from "./friendRouters/friendRouter";
import userRouter from "./userRouters/userRouter";

class allRouters {
    public authRouter = new authRouter().router;
    public userRouter = new userRouter().router;
    public friendRouter = new friendRouter().router;
    public chatRouter = new chatRouter().router;
    public conversationRouter = new conversationRouter().router;
}

export default allRouters;