import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

const validateParams = celebrate({
  [Segments.PARAMS]: { id: Joi.string().uuid().required() },
});

const validateBody = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  },
});

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', validateParams, productsController.show);

productsRouter.post('/', validateBody, productsController.create);

productsRouter.put(
  '/:id',
  validateParams,
  validateBody,
  productsController.update,
);

productsRouter.delete('/:id', validateParams, productsController.delete);

export default productsRouter;
