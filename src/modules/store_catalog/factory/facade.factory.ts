import StoreCatalogFacade from '../facade/storeCatalog.facade';
import ProductRepository from '../repository/product.repository';
import FindAllProductsUsecase from '../use_case/find_all_products/findAllProducts.usecase';
import FindProductUseCase from '../use_case/find_product/findProduct.usecase';

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUsecase(productRepository);

    const facade = new StoreCatalogFacade({
      findUseCase: findUseCase,
      findAllUseCase: findAllUseCase,
    });
    return facade;
  }
}
