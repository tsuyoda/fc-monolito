import IUseCase from '../../@shared/use_case/useCase.interface';
import { IGenerateInvoiceUseCaseInputDto } from '../use_case/generate_invoice/generateInvoice.usecase.dto';
import IInvoiceFacade, {
  IFindInvoiceFacadeInputDto,
  IFindInvoiceFacadeOutputDto,
  IGenerateInvoiceFacadeInputDto,
} from './invoice.facade.interface';

export interface IUseCaseProps {
  findUseCase: IUseCase;
  generateUseCase: IUseCase;
}

export default class InvoiceFacade implements IInvoiceFacade {
  private _findUsecase: IUseCase;
  private _generateUsecase: IUseCase;

  constructor(usecaseProps: IUseCaseProps) {
    this._findUsecase = usecaseProps.findUseCase;
    this._generateUsecase = usecaseProps.generateUseCase;
  }

  async generate(input: IGenerateInvoiceFacadeInputDto): Promise<void> {
    const { address, ...rest } = input;

    const inputUseCase: IGenerateInvoiceUseCaseInputDto = {
      ...rest,
      ...address,
    };

    await this._generateUsecase.execute(inputUseCase);
  }
  async find(
    input: IFindInvoiceFacadeInputDto,
  ): Promise<IFindInvoiceFacadeOutputDto> {
    return this._findUsecase.execute(input);
  }
}
