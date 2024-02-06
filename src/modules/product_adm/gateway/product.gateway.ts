import Product from '../domain/product.entity';

export default interface IProductGateway {
  add(product: Product): Promise<void>;
  findById(id: string): Promise<Product>;
}
