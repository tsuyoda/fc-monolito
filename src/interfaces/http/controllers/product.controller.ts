import AddProductUseCase from '../../../modules/product_adm/use_case/add_product/addProduct.usecase';
import AddCatalogUseCase from '../../../modules/store_catalog/use_case/add_product/addCatalog.usecase';
import {
  IAddCatalogSchema,
  IProductCreateSchema,
} from '../validators/schemas/product.schema';

export default class ProductController {
  constructor(
    private addProductUseCase: AddProductUseCase,
    private addCatalogUseCase: AddCatalogUseCase,
  ) {}

  async create(data: IProductCreateSchema) {
    return this.addProductUseCase.execute(data);
  }

  async addCatalog(data: IAddCatalogSchema) {
    return this.addCatalogUseCase.execute(data);
  }
}
