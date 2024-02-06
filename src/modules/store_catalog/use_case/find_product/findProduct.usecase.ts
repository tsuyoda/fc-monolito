import ICatalogProductGateway from '../../gateway/catalogProduct.gateway';
import {
  IFindCatalogProductInputDto,
  IFindCatalogProductOutputDto,
} from './findProduct.dto';

export default class FindProductUseCase {
  constructor(
    private readonly catalogProductRepository: ICatalogProductGateway,
  ) {}

  async execute(
    input: IFindCatalogProductInputDto,
  ): Promise<IFindCatalogProductOutputDto> {
    const product = await this.catalogProductRepository.findByProductId(
      input.productId,
    );

    return {
      id: product.id.value,
      productId: product.productId.value,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
