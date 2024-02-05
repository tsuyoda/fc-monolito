import Address from '../../../@shared/domain/value_object/address.valueObject';
import Id from '../../../@shared/domain/value_object/id.valueObject';
import Client from '../../domain/client.entity';
import IClientGateway from '../../gateway/client.gateway';
import {
  IAddClientInputDto,
  IAddClientOutputDto,
} from './addClient.usecase.dto';

export default class AddClientUseCase {
  private _clientRepository: IClientGateway;

  constructor(clientRepository: IClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: IAddClientInputDto): Promise<IAddClientOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address(
        input.address.street,
        input.address.number,
        input.address.complement,
        input.address.city,
        input.address.state,
        input.address.zipCode,
      ),
    };

    const client = new Client(props);
    await this._clientRepository.add(client);

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.address.street,
        client.address.number,
        client.address.complement,
        client.address.city,
        client.address.state,
        client.address.zipCode,
      ),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
