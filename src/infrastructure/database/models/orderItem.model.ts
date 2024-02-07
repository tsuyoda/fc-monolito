import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderModel } from './order.model';
import StoreCatalogModel from './storeCatalog.model';
import { ProductModel } from './product.model';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export class OrderItemModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false, field: 'order_id' })
  declare orderId: string;

  @ForeignKey(() => StoreCatalogModel)
  @Column({ allowNull: false, field: 'catalog_product_id' })
  declare catalogProductId: string;

  @BelongsTo(() => StoreCatalogModel)
  declare catalogProduct: StoreCatalogModel;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false, field: 'product_id' })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;
}
