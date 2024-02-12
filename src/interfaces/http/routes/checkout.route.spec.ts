import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { initDb } from '../../../infrastructure/database/sequelize';
import { app } from '../../../infrastructure/api/express';

describe('Checkout routes e2e tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = await initDb({ memoryStorage: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should place a order', async () => {
    const customerInput = {
      name: 'Customer',
      email: 'email@client.com',
      document: 'Document',
      address: {
        street: 'Street',
        number: 10,
        complement: 'Complement',
        state: 'State',
        zipCode: 'ZIP',
        city: 'City',
      },
    };

    const customerResponse = await request(app)
      .post('/client')
      .send(customerInput);

    expect(customerResponse.status).toBe(201);

    const productInput = {
      name: 'Product',
      description: 'Description',
      purchasePrice: 100,
      stock: 10,
    };

    const productResponse = await request(app)
      .post('/product')
      .send(productInput);

    expect(productResponse.status).toBe(201);

    const productId = productResponse.body.id;

    const catalogInput = {
      productId,
      name: 'Catalog',
      description: 'Description',
      salesPrice: 100,
    };

    const catalogResponse = await request(app)
      .post(`/product/${productId}/catalog`)
      .send(catalogInput);

    expect(catalogResponse.status).toBe(201);

    const orderInput = {
      clientId: customerResponse.body.id,
      products: [
        {
          productId,
        },
      ],
    };

    const orderResponse = await request(app).post(`/checkout`).send(orderInput);

    expect(orderResponse.status).toBe(201);

    expect(orderResponse.body).toStrictEqual({
      id: expect.any(String),
      total: 100,
      products: orderInput.products,
    });
  });
});
