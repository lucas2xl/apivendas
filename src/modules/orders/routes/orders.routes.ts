import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

const validateParams = celebrate({
  [Segments.PARAMS]: { id: Joi.string().uuid().required() },
});

const validateBody = celebrate({
  [Segments.BODY]: {
    customer_id: Joi.string().uuid().required(),
    products: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
        quantity: Joi.number().integer().positive().required(),
      }),
    ),
  },
});

ordersRouter.get('/:id', validateParams, ordersController.show);

ordersRouter.post('/', validateBody, ordersController.create);

export default ordersRouter;
