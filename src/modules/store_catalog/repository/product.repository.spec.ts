import { Sequelize } from 'sequelize-typescript';
import StoreCatalogModel from '../../../infrastructure/database/models/storeCatalog.model';
import ProductRepository from './product.repository';
import { ProductModel } from '../../../infrastructure/database/models/product.model';

describe('ProductRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([StoreCatalogModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find all products', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      purchasePrice: 200,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await StoreCatalogModel.create({
      id: '1',
      productId: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    });

    await StoreCatalogModel.create({
      id: '2',
      productId: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.value).toBe('1');
    expect(products[0].productId.value).toBe('1');
    expect(products[0].name).toBe('Product 1');
    expect(products[0].description).toBe('Description 1');
    expect(products[0].salesPrice).toBe(100);
    expect(products[1].id.value).toBe('2');
    expect(products[1].productId.value).toBe('2');
    expect(products[1].name).toBe('Product 2');
    expect(products[1].description).toBe('Description 2');
    expect(products[1].salesPrice).toBe(200);
  });

  it('should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await StoreCatalogModel.create({
      id: '1',
      productId: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    });

    const productRepository = new ProductRepository();
    const product = await productRepository.findByProductId('1');

    expect(product.id.value).toBe('1');
    expect(product.productId.value).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Description 1');
    expect(product.salesPrice).toBe(100);
  });
});
