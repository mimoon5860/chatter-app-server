import express, { Application, Request, Response } from 'express';
import { createServer, Server } from "http";
import cors from 'cors';
import allRouters from './routers/allRouters';
import morgan from 'morgan';
import notFound from './middleware/notFound';
import errorHandle from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import { io, socketServer } from './utils/socket/socket';
import path from 'path';

class App {
  private app: Application;
  private port: number;
  private httpServer: Server;

  private origin = [
    'http://localhost:3000',
  ]

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.httpServer = createServer(this.app);
    socketServer(this.httpServer);
    this.initMiddlewares();
    this.sendFiles();
    this.startingRouters(new allRouters());
    this.errorHandle();

  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: this.origin, credentials: true }));
    this.app.use(morgan('tiny'));
    this.app.use(cookieParser());
  }

  private startingRouters(routers: allRouters) {
    this.app.get('/', (_req, res) => {
      res.send('Server is running bro chill!');
    });

    io.on("connection", (socket) => {
      console.log('Socket Connected. id: ' + socket.id);
    });

    // auth router 
    this.app.use('/api/auth', routers.authRouter);

    // user router
    this.app.use('/api/user', routers.userRouter);

    // friend activity router 
    this.app.use('/api/friend', routers.friendRouter);

    // chatting router 
    this.app.use('/api/chats', routers.chatRouter);

    // conversation routers 
    this.app.use('/api/conversation', routers.conversationRouter);

    this.app.use(new notFound().notFound)
  }

  private sendFiles() {
    this.app.get('/get/image/:folder/:filename', (req: Request, res: Response) => {
      const { folder, filename } = req.params;
      res.sendFile(path.resolve(`${__dirname}/uploads/${folder}/${filename}`));
    });
  }

  private errorHandle() {
    this.app.use(new errorHandle().error);
  }

  public listen() {
    this.httpServer.listen(this.port, () => {
      console.log(`Server is running at port ${this.port}`);
    });
  }
}

export default App;
