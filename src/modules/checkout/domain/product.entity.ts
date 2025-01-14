import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value_object/id.valueObject';

interface IProductProps {
  id: Id;
  catalogProductId: Id;
  name: string;
  description: string;
  salesPrice: number;
}

export default class Product extends BaseEntity {
  private _catalogProductId: Id;
  private _name: string;
  private _description: string;
  private _salesPrice: number;

  constructor(props: IProductProps) {
    super(props.id);
    this._catalogProductId = props.catalogProductId;
    this._name = props.name;
    this._description = props.description;
    this._salesPrice = props.salesPrice;
  }

  get salesPrice() {
    return this._salesPrice;
  }

  get catalogProductId() {
    return this._catalogProductId;
  }
}
