import IUseCase from '../../@shared/use_case/useCase.interface';
import IProductAdmFacade, {
  IAddProductFacadeInputDto,
  ICheckStockFacadeInputDto,
  ICheckStockFacadeOutputDto,
} from './productAdm.facade.interface';

export interface IUseCasesProps {
  addUseCase: IUseCase;
  stockUseCase: IUseCase;
}

export default class ProductAdmFacade implements IProductAdmFacade {
  private _addUsecase: IUseCase;
  private _checkStockUsecase: IUseCase;

  constructor(usecasesProps: IUseCasesProps) {
    this._addUsecase = usecasesProps.addUseCase;
    this._checkStockUsecase = usecasesProps.stockUseCase;
  }

  addProduct(input: IAddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
    return this._addUsecase.execute(input);
  }
  checkStock(
    input: ICheckStockFacadeInputDto,
  ): Promise<ICheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }
}
