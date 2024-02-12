import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { InvoiceItemModel } from './invoiceItem.model';

@Table({
  tableName: 'invoices',
  timestamps: false,
})
export class InvoiceModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare document: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: number;

  @Column({ allowNull: true })
  declare complement: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ allowNull: false })
  declare zipCode: string;

  @Column({ allowNull: false, field: 'created_at' })
  declare createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  declare updatedAt: Date;

  @HasMany(() => InvoiceItemModel)
  declare items: InvoiceItemModel[];
}
