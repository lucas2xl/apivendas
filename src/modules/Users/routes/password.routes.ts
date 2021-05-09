import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/Users/controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const validateBodyForgot = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

const validateBodyReset = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

passwordRouter.post(
  '/forgot',
  validateBodyForgot,
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  validateBodyReset,
  resetPasswordController.create,
);

export default passwordRouter;
