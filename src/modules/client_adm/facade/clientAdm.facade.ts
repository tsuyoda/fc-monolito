import IUseCase from '../../@shared/use_case/useCase.interface';
import IClientAdmFacade, {
  IAddClientFacadeInputDto,
  IFindClientFacadeInputDto,
  IFindClientFacadeOutputDto,
} from './clientAdm.facade.interface';

export interface IUseCaseProps {
  findUsecase: IUseCase;
  addUsecase: IUseCase;
}

export default class ClientAdmFacade implements IClientAdmFacade {
  private _findUsecase: IUseCase;
  private _addUsecase: IUseCase;

  constructor(usecaseProps: IUseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._addUsecase = usecaseProps.addUsecase;
  }

  async add(input: IAddClientFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input);
  }
  async find(
    input: IFindClientFacadeInputDto,
  ): Promise<IFindClientFacadeOutputDto> {
    return await this._findUsecase.execute(input);
  }
}
