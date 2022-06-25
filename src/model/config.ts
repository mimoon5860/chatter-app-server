import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') })
type Tconfig = { DB_PASS: string }

export const config: Tconfig = { DB_PASS: process.env.DB_PASS }
export const uri: string = 'mongodb://localhost:27017/ued'