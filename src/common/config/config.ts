import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

type ENV = {
  DB_PASS: string;
};

export const dbConfig: ENV = {
  DB_PASS: process.env.DB_PASS,
};
