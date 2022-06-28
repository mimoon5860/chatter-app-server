import { MongoClient, Db, Collection } from 'mongodb'
import { config } from './config';

class db {
  public client: MongoClient;
  private database: Db;
  constructor() {
    this.client = new MongoClient(`mongodb+srv://ued_db:${config.DB_PASS}@cluster0.avbdrcj.mongodb.net/?retryWrites=true&w=majority`);
    this.getDbAccess();
  }

  // database connection 
  private getDbAccess = async () => {
    await this.client.connect();
    this.database = this.client.db('ued');
  }

  // get user collection 
  public getUserConnection = () => {
    const userConnection: Collection = this.database.collection('users');
    return userConnection;
  }


}

export default db;
