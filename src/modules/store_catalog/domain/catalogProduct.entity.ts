import IAggregateRoot from '../../@shared/domain/entity/aggregateRoot.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value_object/id.valueObject';

type CatalogProductProps = {
  id: Id;
  productId: Id;
  name: string;
  description: string;
  salesPrice: number;
};

export default class CatalogProduct
  extends BaseEntity
  implements IAggregateRoot
{
  private _name: string;
  private _description: string;
  private _salesPrice: number;
  private _productId: Id;

  constructor(props: CatalogProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._salesPrice = props.salesPrice;
    this._productId = props.productId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get salesPrice(): number {
    return this._salesPrice;
  }

  get productId(): Id {
    return this._productId;
  }
}
