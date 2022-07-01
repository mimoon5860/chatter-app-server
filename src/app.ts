import express, { Application } from 'express';
import cors from 'cors';
import allRouters from './routers/allRouters';
import morgan from 'morgan';
import notFound from './middleware/notFound';
import errorHandle from './middleware/errorHandler';

class App {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddlewares();
    this.startingRouters(new allRouters());
    this.errorHandle();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors())
    this.app.use(morgan('tiny'))
  }

  private startingRouters(routers: allRouters) {
    this.app.get('/', (_req, res) => {
      res.send('Server is running bro chill!');
    });

    // auth router 
    this.app.use('/auth', routers.authRouter);

    this.app.use(new notFound().notFound)
  }

  private errorHandle() {
    this.app.use(new errorHandle().error)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at port ${this.port}`);
    });
  }
}

export default App;
