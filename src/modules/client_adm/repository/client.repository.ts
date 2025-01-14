import Address from '../../@shared/domain/value_object/address.valueObject';
import Id from '../../@shared/domain/value_object/id.valueObject';
import Client from '../domain/client.entity';
import IClientGateway from '../gateway/client.gateway';
import { ClientModel } from '../../../infrastructure/database/models/client.model';

export default class ClientRepository implements IClientGateway {
  async add(entity: Client): Promise<void> {
    await ClientModel.create({
      id: entity.id.value,
      name: entity.name,
      email: entity.email,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new Error('Client not found');
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.street,
        client.number,
        client.complement,
        client.city,
        client.state,
        client.zipcode,
      ),
      createdAt: client.createdAt,
      updatedAt: client.createdAt,
    });
  }
}
