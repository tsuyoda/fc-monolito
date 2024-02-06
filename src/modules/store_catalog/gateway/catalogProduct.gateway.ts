import CatalogProduct from '../domain/catalogProduct.entity';

export default interface ICatalogProductGateway {
  findAll(): Promise<CatalogProduct[]>;
  findByProductId(productId: string): Promise<CatalogProduct>;
}
