import { Request, Response, NextFunction } from 'express';
import Redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (e) {
    throw new AppError('Too many request', 429);
  }
};

export default rateLimiter;
