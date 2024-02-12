import CatalogProduct from '../domain/catalogProduct.entity';

export default interface ICatalogProductGateway {
  add(catalogProduct: CatalogProduct): Promise<void>;
  findAll(): Promise<CatalogProduct[]>;
  findByProductId(productId: string): Promise<CatalogProduct>;
}
