import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

const validateBody = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

passwordRouter.post('/forgot', validateBody, forgotPasswordController.create);

export default passwordRouter;
