import express, { Request, Response } from 'express';
import Validator from '../validators/validator';
import {
  addCatalogSchema,
  productCreateSchema,
} from '../validators/schemas/product.schema';
import ProductController from '../controllers/product.controller';
import AddProductUseCase from '../../../modules/product_adm/use_case/add_product/addProduct.usecase';
import ProductRepository from '../../../modules/product_adm/repository/product.repository';
import AddCatalogUseCase from '../../../modules/store_catalog/use_case/add_product/addCatalog.usecase';
import CatalogProductRepository from '../../../modules/store_catalog/repository/product.repository';

export const productRouter = express.Router();

const productRepository = new ProductRepository();
const catalogProductRepository = new CatalogProductRepository();
const addProductUseCase = new AddProductUseCase(productRepository);
const addCatalogUseCase = new AddCatalogUseCase(catalogProductRepository);

const controller = new ProductController(addProductUseCase, addCatalogUseCase);

productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = await Validator.validate(productCreateSchema, req.body);

    const response = await controller.create(data);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRouter.post(
  '/:productId/catalog',
  async (req: Request, res: Response) => {
    try {
      const input = {
        productId: req.params.productId,
        ...req.body,
      };

      const data = await Validator.validate(addCatalogSchema, input);

      const response = await controller.addCatalog(data);

      res.status(201).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
);
