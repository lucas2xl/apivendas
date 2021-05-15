import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}
@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({
      where: {
        name,
      },
    });
  }
  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const productsExists = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return productsExists;
  }
}

export default ProductRepository;
