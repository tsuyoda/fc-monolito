import IUseCase from '../../@shared/use_case/useCase.interface';
import IPaymentFacade, {
  IPaymentFacadeInputDto,
  IPaymentFacadeOutputDto,
} from './facade.interface';

export default class PaymentFacade implements IPaymentFacade {
  constructor(private processPaymentUseCase: IUseCase) {}
  process(input: IPaymentFacadeInputDto): Promise<IPaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }
}
