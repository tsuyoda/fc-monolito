import Id from '../../../@shared/domain/value_object/id.valueObject';
import CatalogProduct from '../../domain/catalogProduct.entity';
import AddCatalogUseCase from './addCatalog.usecase';

const product = {
  productId: new Id(),
  name: 'Product 1',
  description: 'Product 1 description',
  salesPrice: 100,
};

const MockRepository = () => {
  return {
    add: jest
      .fn()
      .mockReturnValue(() => Promise.resolve(new CatalogProduct(product))),
    findAll: jest.fn(),
    findByProductId: jest.fn(),
  };
};

describe('Add Catalog Product usecase unit test', () => {
  it('should add a catalog product', async () => {
    const productRepository = MockRepository();
    const usecase = new AddCatalogUseCase(productRepository);

    const input = {
      productId: product.productId.value,
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100,
    };

    const result = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.salesPrice).toBe(input.salesPrice);
  });
});
