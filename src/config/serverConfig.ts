import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
export const REDIS_HOST = (process.env.REDIS_HOST || 'localhost');
