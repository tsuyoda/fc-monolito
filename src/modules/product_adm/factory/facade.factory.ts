import ProductAdmFacade from '../facade/productAdm.facade';
import ProductRepository from '../repository/product.repository';
import AddProductUseCase from '../use_case/add_product/addProduct.usecase';
import CheckStockUseCase from '../use_case/check_stock/checkStock.usecase';

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    });

    return productFacade;
  }
}
