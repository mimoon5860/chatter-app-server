import { MongoClient } from 'mongodb'
import { config } from './config';

class db {
  public pool: MongoClient;
  constructor() {
    this.pool = new MongoClient(`mongodb+srv://ued_db:${config.DB_PASS}@cluster0.avbdrcj.mongodb.net/?retryWrites=true&w=majority`);
  }

  public getDbAccess = async (collection: string) => {
    await this.pool.connect();
    const database = this.pool.db('ued');
    const connection = database.collection(collection);
    return connection;
  }
}

export default db;
