import Address from '../../../@shared/domain/value_object/address.valueObject';
import Id from '../../../@shared/domain/value_object/id.valueObject';
import Client from '../../domain/client.entity';
import FindClientUseCase from './findClient.usecase';

const client = new Client({
  id: new Id('1'),
  name: 'Lucian',
  email: 'lucian@123.com',
  document: '1234-5678',
  address: new Address(
    'Rua 123',
    99,
    'Casa Verde',
    'Criciúma',
    'SC',
    '88888-888',
  ),
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe('Find Client use case unit test', () => {
  it('should find a client', async () => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);

    const input = {
      id: '1',
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address.toObject());
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
