import ClientAdmFacade from '../facade/clientAdm.facade';
import ClientRepository from '../repository/client.repository';
import AddClientUseCase from '../use_case/add_client/addClient.usecase';
import FindClientUseCase from '../use_case/find_client/findClient.usecase';

export default class ClientAdmFacadeFactory {
  static create() {
    const repository = new ClientRepository();
    const findUsecase = new FindClientUseCase(repository);
    const addUsecase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: findUsecase,
    });

    return facade;
  }
}
