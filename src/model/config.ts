import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') })
type Tconfig = { DB_PASS: string }

export const config: Tconfig = { DB_PASS: process.env.DB_PASS };
export const jwtSecret: Secret = process.env.JWT_SECRET;
