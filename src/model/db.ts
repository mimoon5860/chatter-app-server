import mysql, { Pool } from 'mysql2';
import { config } from './config';

class db {
  public pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: config.DB_PASS,
      database: 'ued',
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
    });
  }

}

export default db;
