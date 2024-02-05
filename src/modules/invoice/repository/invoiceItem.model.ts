import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { InvoiceModel } from './invoice.model';

@Table({
  tableName: 'invoice_items',
  timestamps: false,
})
export class InvoiceItemModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoice_id: string;
}
