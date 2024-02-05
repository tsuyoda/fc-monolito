import Id from '../../../@shared/domain/value_object/id.valueObject';
import Product from '../../domain/product.entity';
import IProductGateway from '../../gateway/product.gateway';
import { IAddProductInputDto, IAddProductOutputDto } from './addProduct.dto';

export default class AddProductUseCase {
  private _productRepository: IProductGateway;

  constructor(_productRepository: IProductGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: IAddProductInputDto): Promise<IAddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    const product = new Product(props);
    this._productRepository.add(product);

    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
