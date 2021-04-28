import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  productsController.show,
);

productsRouter.post('/', productsController.create);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
