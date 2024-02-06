import Id from '../../../@shared/domain/value_object/id.valueObject';
import Product from '../../domain/product.entity';
import CheckStockUseCase from './checkStock.usecase';

const product = new Product({
  id: new Id('1'),
  name: 'Product',
  description: 'Product description',
  purchasePrice: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe('CheckStock usecase unit test', () => {
  it('should get stock of a product', async () => {
    const ProductRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(ProductRepository);
    const input = {
      productId: '1',
    };

    const result = await checkStockUseCase.execute(input);

    expect(ProductRepository.findById).toHaveBeenCalled();
    expect(result.productId).toBe('1');
    expect(result.stock).toBe(10);
  });
});
