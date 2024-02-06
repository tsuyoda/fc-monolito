import FindAllProductsUsecase from '../use_case/find_all_products/findAllProducts.usecase';
import FindProductUseCase from '../use_case/find_product/findProduct.usecase';
import IStoreCatalogFacade, {
  IFindAllStoreCatalogFacadeOutputDto,
  IFindStoreCatalogFacadeInputDto,
  IFindStoreCatalogFacadeOutputDto,
} from './storeCatalog.facade.interface';

export interface IUseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements IStoreCatalogFacade {
  private _findUseCase: FindProductUseCase;
  private _findAllUseCase: FindAllProductsUsecase;

  constructor(props: IUseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
  }

  async findByProductId(
    input: IFindStoreCatalogFacadeInputDto,
  ): Promise<IFindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }
  async findAll(): Promise<IFindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute();
  }
}
