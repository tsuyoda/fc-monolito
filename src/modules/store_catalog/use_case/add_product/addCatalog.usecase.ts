import Id from '../../../@shared/domain/value_object/id.valueObject';
import CatalogProduct from '../../domain/catalogProduct.entity';
import ICatalogProductGateway from '../../gateway/catalogProduct.gateway';

import { IAddCatalogInputDto, IAddCatalogOutputDto } from './addCatalog.dto';

export default class AddCatalogUseCase {
  private _catalogRepository: ICatalogProductGateway;

  constructor(catalogRepository: ICatalogProductGateway) {
    this._catalogRepository = catalogRepository;
  }

  async execute(input: IAddCatalogInputDto): Promise<IAddCatalogOutputDto> {
    const props = {
      id: new Id(input.id),
      productId: new Id(input.productId),
      name: input.name,
      description: input.description,
      salesPrice: input.salesPrice,
    };

    const catalogProduct = new CatalogProduct(props);
    this._catalogRepository.add(catalogProduct);

    return {
      id: catalogProduct.id.value,
      productId: catalogProduct.productId.value,
      name: catalogProduct.name,
      description: catalogProduct.description,
      salesPrice: catalogProduct.salesPrice,
      createdAt: catalogProduct.createdAt,
      updatedAt: catalogProduct.updatedAt,
    };
  }
}
