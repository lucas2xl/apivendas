import 'reflect-metadata';
import '@shared/typeorm';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
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
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333! 🚀');
});
