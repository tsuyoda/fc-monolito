import AddClientUseCase from '../../../modules/client_adm/use_case/add_client/addClient.usecase';
import FindClientUseCase from '../../../modules/client_adm/use_case/find_client/findClient.usecase';
import { IClientCreateSchema } from '../validators/schemas/client.schema';
import { IIdSchema } from '../validators/schemas/shared.schema';

export default class ClientController {
  constructor(
    private addClientUseCase: AddClientUseCase,
    private findClientUseCase: FindClientUseCase,
  ) {}

  async create(data: IClientCreateSchema) {
    return this.addClientUseCase.execute(data);
  }

  async findById(data: IIdSchema) {
    return this.findClientUseCase.execute(data);
  }
}
