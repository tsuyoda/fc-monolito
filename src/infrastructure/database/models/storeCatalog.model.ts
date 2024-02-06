import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';

@Table({
  tableName: 'store_catalog',
  timestamps: false,
})
export default class StoreCatalogModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: true, field: 'product_id' })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false, field: 'sales_price' })
  declare salesPrice: number;
}
