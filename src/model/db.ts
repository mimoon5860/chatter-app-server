import mysql, { Pool } from 'mysql2';
import { dbConfig } from '../common/config/config';

class db {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: "Mo62466385@",
      database: 'ued',
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
    });
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export default db; 
