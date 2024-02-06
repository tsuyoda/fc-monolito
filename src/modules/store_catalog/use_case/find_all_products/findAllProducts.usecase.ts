import IUseCase from '../../../@shared/use_case/useCase.interface';
import IProductGateway from '../../gateway/catalogProduct.gateway';

export default class FindAllProductsUsecase implements IUseCase {
  constructor(private productRepository: IProductGateway) {}

  async execute(): Promise<any> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map(product => ({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
