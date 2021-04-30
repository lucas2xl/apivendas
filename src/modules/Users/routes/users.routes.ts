import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticate from '@shared/http/middlewares/isAuthenticate';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

const validateParams = celebrate({
  [Segments.PARAMS]: { id: Joi.string().uuid().required() },
});

const validateBody = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

usersRouter.get('/', isAuthenticate, usersController.index);

// usersRouter.get('/:id', validateParams, usersController.show);

usersRouter.post('/', validateBody, usersController.create);

// usersRouter.put(
//   '/:id',
//   validateParams,
//   validateBody,
//   usersController.update,
// );

// usersRouter.delete('/:id', validateParams, usersController.delete);

// Upload Avatar
usersRouter.patch(
  '/avatar',
  isAuthenticate,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
