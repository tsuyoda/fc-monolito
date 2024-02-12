import Id from '../../@shared/domain/value_object/id.valueObject';
import CatalogProduct from '../domain/catalogProduct.entity';
import ICatalogProductGateway from '../gateway/catalogProduct.gateway';
import StoreCatalogModel from '../../../infrastructure/database/models/storeCatalog.model';

export default class CatalogProductRepository
  implements ICatalogProductGateway
{
  async findAll(): Promise<CatalogProduct[]> {
    const products = await StoreCatalogModel.findAll();

    return products.map(
      catalogProduct =>
        new CatalogProduct({
          id: new Id(catalogProduct.id),
          productId: new Id(catalogProduct.productId),
          name: catalogProduct.name,
          description: catalogProduct.description,
          salesPrice: catalogProduct.salesPrice,
        }),
    );
  }
  async findByProductId(productId: string): Promise<CatalogProduct> {
    const catalogProduct = await StoreCatalogModel.findOne({
      where: {
        productId,
      },
    });

    if (!catalogProduct) {
      throw new Error(`Product with id ${productId} not found`);
    }

    return new CatalogProduct({
      id: new Id(catalogProduct.id),
      productId: new Id(catalogProduct.productId),
      name: catalogProduct.name,
      description: catalogProduct.description,
      salesPrice: catalogProduct.salesPrice,
    });
  }
}
