import express, { Request, Response } from 'express';
import Validator from '../validators/validator';
import { placeOrderSchema } from '../validators/schemas/checkout.schema';
import CheckoutController from '../controllers/checkout.controller';
import PlaceOrderUseCase from '../../../modules/checkout/use_case/placeOrder.usecase';
import ClientAdmFacadeFactory from '../../../modules/client_adm/factory/clientAdm.facade.factory';
import ProductAdmFacadeFactory from '../../../modules/product_adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../../modules/store_catalog/factory/facade.factory';
import OrderRepository from '../../../modules/checkout/repository/order.repository';

export const checkoutRouter = express.Router();

const clientFacade = ClientAdmFacadeFactory.create();
const productFacade = ProductAdmFacadeFactory.create();
const catalogFacade = StoreCatalogFacadeFactory.create();
const orderRepository = new OrderRepository();

const placeOrderUseCase = new PlaceOrderUseCase(
  clientFacade,
  productFacade,
  catalogFacade,
  orderRepository,
);
const controller = new CheckoutController(placeOrderUseCase);

checkoutRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = await Validator.validate(placeOrderSchema, req.body);

    const response = await controller.placeOrder(data);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});
