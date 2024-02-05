import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value_object/id.valueObject';

interface IInvoiceItemProps {
  id?: Id;
  name: string;
  price: number;
}

export default class InvoiceItem extends BaseEntity {
  private _name: string;
  private _price: number;

  constructor(props: IInvoiceItemProps) {
    super(props.id);
    this._name = props.name;
    this._price = props.price;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}
