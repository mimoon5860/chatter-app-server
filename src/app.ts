import express, { Application } from 'express';
import cors from 'cors';
import routers from './routers/routers';

class App {
  private app: Application;
  private port: number;
  private routers;;


  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.routers = new routers()
    this.initMiddlewares();
    this.startingRouters(routers);

  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors())
  }

  private startingRouters(routers) {
    this.app.get('/', (req, res) => {
      res.send('Server is running bro chill!');
    });
    this.app.use(routers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at port ${this.port}`);
    });
  }
}

export default App;
