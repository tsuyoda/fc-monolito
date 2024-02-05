import IProductGateway from '../../gateway/product.gateway';
import { ICheckStockInputDto, ICheckStockOutputDto } from './checkStock.dto';

export default class CheckStockUseCase {
  private _productRepository: IProductGateway;

  constructor(productRepository: IProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: ICheckStockInputDto): Promise<ICheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId);
    return {
      productId: product.id.value,
      stock: product.stock,
    };
  }
}
