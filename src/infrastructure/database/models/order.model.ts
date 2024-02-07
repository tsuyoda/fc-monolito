import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ClientModel } from './client.model';
import { OrderItemModel } from './orderItem.model';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export class OrderModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @Column({ allowNull: false })
  declare status: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false, field: 'client_id' })
  declare clientId: string;

  @BelongsTo(() => ClientModel)
  declare client: ClientModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false, field: 'created_at' })
  declare createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  declare updatedAt: Date;
}
