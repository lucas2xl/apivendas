import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      String(process.env.PRODUCT_KEY_CACHE),
    );

    if (!products) {
      products = await productsRepository.find();
      await redisCache.save(String(process.env.PRODUCT_KEY_CACHE), products);
    }

    return products;
  }
}

export default ListProductsService;
