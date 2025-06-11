import Redis from 'ioredis';

import { REDIS_HOST, REDIS_PORT } from './serverConfig';

const redisConfig = {
  port: REDIS_PORT,
  host: REDIS_HOST,
};

const redisConnection = new Redis(redisConfig);

export default redisConfig;
