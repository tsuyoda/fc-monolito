import Address from '../../../@shared/domain/value_object/address.valueObject';
import IClientGateway from '../../gateway/client.gateway';
import {
  IFindClientUseCaseInputDto,
  IFindClientUseCaseOutputDto,
} from './findClient.usecase.dto';

export default class FindClientUseCase {
  private _clientRepository: IClientGateway;

  constructor(clientRepository: IClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(
    input: IFindClientUseCaseInputDto,
  ): Promise<IFindClientUseCaseOutputDto> {
    const result = await this._clientRepository.find(input.id);

    return {
      id: result.id.value,
      name: result.name,
      email: result.email,
      document: result.document,
      address: new Address(
        result.address.street,
        result.address.number,
        result.address.complement,
        result.address.city,
        result.address.state,
        result.address.zipCode,
      ),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}
