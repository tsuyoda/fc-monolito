import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { initDb } from '../../../infrastructure/database/sequelize';
import { app } from '../../../infrastructure/api/express';

describe('Client routes e2e tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = await initDb({ memoryStorage: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should create a customer', async () => {
    const input = {
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

    const response = await request(app).post('/client').send(input);

    expect(response.status).toBe(201);

    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      document: input.document,
      address: {
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        state: input.address.state,
        zipCode: input.address.zipCode,
        city: input.address.city,
      },
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('Should find a customer', async () => {
    const input = {
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

    const createResponse = await request(app).post('/client').send(input);

    expect(createResponse.status).toBe(201);

    const clientId = createResponse.body.id;

    const findResponse = await request(app).get(`/client/${clientId}`);

    expect(findResponse.body).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      document: input.document,
      address: {
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        state: input.address.state,
        zipCode: input.address.zipCode,
        city: input.address.city,
      },
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
