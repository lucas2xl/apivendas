import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await redisCache.invalidate(String(process.env.PRODUCT_KEY_CACHE));

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
