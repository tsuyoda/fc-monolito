import IAggregateRoot from '../../@shared/domain/entity/aggregateRoot.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Address from '../../@shared/domain/value_object/address.valueObject';
import Id from '../../@shared/domain/value_object/id.valueObject';
import InvoiceItem from './invoiceItems.entity';

interface IInvoiceProps {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements IAggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItem[];
  private _total: number;

  constructor(props: IInvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
    this._total = this.calculateTotal();
  }

  get name() {
    return this._name;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }

  get items() {
    return this._items;
  }

  get total() {
    return this._total;
  }

  private calculateTotal() {
    return this._items.reduce((acc, item) => {
      acc += item.price;
      return acc;
    }, 0);
  }
}
