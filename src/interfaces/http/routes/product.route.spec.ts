import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { initDb } from '../../../infrastructure/database/sequelize';
import { app } from '../../../infrastructure/api/express';

describe('Product routes e2e tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = await initDb({ memoryStorage: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should create a product', async () => {
    const input = {
      name: 'Product',
      description: 'Description',
      purchasePrice: 100,
      stock: 10,
    };

    const response = await request(app).post('/product').send(input);

    expect(response.status).toBe(201);

    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('Should add product catalog', async () => {
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

    expect(catalogResponse.body).toStrictEqual({
      id: expect.any(String),
      productId: catalogInput.productId,
      name: catalogInput.name,
      description: catalogInput.description,
      salesPrice: catalogInput.salesPrice,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
