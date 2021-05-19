import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import '@shared/typeorm';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import allowCors from '@config/cors';
import rateLimiter from '@shared/http/middlewares/rateLimiter';
import routes from './routes';

const app = express();

app.use(cors());
app.use(allowCors);

app.use(express.json());
app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  res.json(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.APP_API_PORT, () => {
  console.log(`🚀 Server started on port ${process.env.APP_API_PORT}! 🚀`);
});
