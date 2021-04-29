import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersController = new UsersController();

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

usersRouter.get('/', usersController.index);

// usersRouter.get('/:id', validateParams, usersController.show);

usersRouter.post('/', validateBody, usersController.create);

// usersRouter.put(
//   '/:id',
//   validateParams,
//   validateBody,
//   usersController.update,
// );

// usersRouter.delete('/:id', validateParams, usersController.delete);

export default usersRouter;
