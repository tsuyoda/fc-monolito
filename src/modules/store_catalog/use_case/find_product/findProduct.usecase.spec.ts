import Id from '../../../@shared/domain/value_object/id.valueObject';
import CatalogProduct from '../../domain/catalogProduct.entity';
import FindProductUseCase from './findProduct.usecase';

const product = new CatalogProduct({
  id: new Id('1'),
  productId: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
});

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    findByProductId: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe('find a product usecase unit test', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      productId: '1',
    };

    const result = await usecase.execute(input);

    expect(productRepository.findByProductId).toHaveBeenCalled();
    expect(result.id).toBe('1');
    expect(result.productId).toBe('1');
    expect(result.name).toBe('Product 1');
    expect(result.description).toBe('Description 1');
    expect(result.salesPrice).toBe(100);
  });
});
