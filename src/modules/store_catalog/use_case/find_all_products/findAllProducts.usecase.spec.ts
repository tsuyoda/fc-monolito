import Id from '../../../@shared/domain/value_object/id.valueObject';
import CatalogProduct from '../../domain/catalogProduct.entity';
import FindAllProductsUsecase from './findAllProducts.usecase';

const product = new CatalogProduct({
  id: new Id('1'),
  productId: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
});

const product2 = new CatalogProduct({
  id: new Id('2'),
  productId: new Id('2'),
  name: 'Product 2',
  description: 'Description 2',
  salesPrice: 200,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    findByProductId: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
  };
};

describe('find all products usecase unit test', () => {
  it('should find all products', async () => {
    const productRepository = MockRepository();
    const usecase = new FindAllProductsUsecase(productRepository);

    const result = await usecase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe('1');
    expect(result.products[0].name).toBe('Product 1');
    expect(result.products[0].description).toBe('Description 1');
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].id).toBe('2');
    expect(result.products[1].name).toBe('Product 2');
    expect(result.products[1].description).toBe('Description 2');
    expect(result.products[1].salesPrice).toBe(200);
  });
});
