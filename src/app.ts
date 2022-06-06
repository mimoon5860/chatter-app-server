import express, { Application } from 'express';
import db from './model/db';

class App {
  private app: Application;
  private port: number;
  private pool: db;
  private query: string;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddlewares();
    this.startingRouters();
    this.pool = new db();

  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  private startingRouters() {
    this.app.get('/', (req, res) => {
      res.send('Server is runnig bro chill!');
    });

    this.app.get('/db', (req, res) => {
      this.query = 'SELECT * FROM users';
      this.pool.getPool().query(this.query, (err, result, fields) => {
        console.log(result);
      })
      res.send('all ok');
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at port ${this.port}`);
    });
  }
}

export default App;
