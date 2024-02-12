import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { initDb } from '../../../infrastructure/database/sequelize';
import { app } from '../../../infrastructure/api/express';

describe('Invoice routes e2e tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = await initDb({ memoryStorage: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should generate a invoice', async () => {
    const input = {
      name: 'Invoice',
      document: 'Document',
      street: 'Street',
      number: 100,
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: 'Zip',
      items: [{ id: '1', name: 'Item', price: 100 }],
    };

    const response = await request(app).post('/invoice').send(input);

    expect(response.status).toBe(201);

    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      items: input.items,
      total: 100,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
