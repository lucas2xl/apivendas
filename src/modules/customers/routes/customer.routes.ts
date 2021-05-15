import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomerController from '../controllers/CustomerController';

const CustomersRouter = Router();
const customersController = new CustomerController();

const validateParams = celebrate({
  [Segments.PARAMS]: { id: Joi.string().uuid().required() },
});

const validateBody = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  },
});

CustomersRouter.get('/', customersController.index);

CustomersRouter.get('/:id', validateParams, customersController.show);

CustomersRouter.post('/', validateBody, customersController.create);

CustomersRouter.put(
  '/:id',
  validateParams,
  validateBody,
  customersController.update,
);

CustomersRouter.delete('/:id', validateParams, customersController.delete);

export default CustomersRouter;
