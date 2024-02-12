import { Sequelize } from 'sequelize-typescript';
import { OrderModel } from '../../../infrastructure/database/models/order.model';
import { OrderItemModel } from '../../../infrastructure/database/models/orderItem.model';
import StoreCatalogModel from '../../../infrastructure/database/models/storeCatalog.model';
import { ProductModel } from '../../../infrastructure/database/models/product.model';
import { ClientModel } from '../../../infrastructure/database/models/client.model';
import Client from '../domain/client.entity';
import Id from '../../@shared/domain/value_object/id.valueObject';
import Product from '../domain/product.entity';
import Order from '../domain/order.entity';
import OrderRepository from './order.repository';

describe('Order Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderItemModel,
      StoreCatalogModel,
      ProductModel,
      ClientModel,
      OrderModel,
    ]);
    await sequelize.sync();

    await ClientModel.create({
      id: '1',
      name: 'Client',
      email: 'Email',
      document: 'Document',
      street: 'Street',
      number: 'Number',
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipcode: 'Zip',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: '1',
      name: 'Product',
      description: 'Description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await StoreCatalogModel.create({
      id: '1',
      productId: '1',
      name: 'Catalog Product',
      description: 'Description',
      salesPrice: 100,
    });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a order', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'client@1.com',
      address: 'Address',
    });

    const products = [
      new Product({
        id: new Id('1'),
        productId: new Id('1'),
        name: 'Product 1',
        description: 'Description',
        salesPrice: 100,
      }),
    ];

    const order = new Order({
      id: new Id('1'),
      client,
      products,
    });

    const orderRepository = new OrderRepository();

    await orderRepository.addOrder(order);

    const orderDb = await OrderModel.findOne({
      where: { id: order.id.value },
      include: [OrderItemModel],
    });

    expect(orderDb).toBeDefined();

    expect(orderDb!.clientId).toBe(client.id.value);
    expect(orderDb!.status).toBe(order.status);
    expect(orderDb!.items.map(item => item.catalogProductId)).toStrictEqual(
      products.map(product => product.id.value),
    );
  });

  it('should find a order', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'client@1.com',
      address: 'Address',
    });

    const products = [
      new Product({
        id: new Id('1'),
        productId: new Id('1'),
        name: 'Product 1',
        description: 'Description',
        salesPrice: 100,
      }),
    ];

    const order = new Order({
      id: new Id('1'),
      client,
      products,
    });

    const orderRepository = new OrderRepository();

    await orderRepository.addOrder(order);

    const orderDb = await orderRepository.findOrder(order.id.value);

    expect(orderDb).toBeDefined();
    expect(orderDb.client.id.value).toBe(client.id.value);
    expect(orderDb.status).toBe(order.status);
    expect(orderDb.products.map(product => product.id.value)).toStrictEqual(
      products.map(product => product.id.value),
    );
  });
});
