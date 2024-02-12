import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { ClientModel } from './models/client.model';
import { InvoiceModel } from './models/invoice.model';
import { InvoiceItemModel } from './models/invoiceItem.model';
import { OrderModel } from './models/order.model';
import { OrderItemModel } from './models/orderItem.model';
import { ProductModel } from './models/product.model';
import StoreCatalogModel from './models/storeCatalog.model';
import TransactionModel from './models/transaction.model';

interface IOptions {
  memoryStorage: boolean;
}

export const initDb = async (options?: IOptions): Promise<Sequelize> => {
  const setupOptions: SequelizeOptions = {
    dialect: 'sqlite',
    storage: 'data/database/data.sqlite',
    logging: false,
  };

  if (options?.memoryStorage) {
    setupOptions.storage = ':memory:';
  }

  const sequelize = new Sequelize(setupOptions);

  sequelize.addModels([
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
    OrderModel,
    OrderItemModel,
    ProductModel,
    StoreCatalogModel,
    TransactionModel,
  ]);

  await sequelize.sync({ force: true });

  return sequelize;
};
