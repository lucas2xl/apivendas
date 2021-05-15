import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticate from '@shared/http/middlewares/isAuthenticate';
import ProfileController from '@modules/Users/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticate);

const validateBody = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
  },
});

profileRouter.get('/', profileController.show);

// usersRouter.get('/:id', validateParams, usersController.show);

profileRouter.put('/', validateBody, profileController.update);

export default profileRouter;
