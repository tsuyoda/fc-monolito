import IAggregateRoot from '../../@shared/domain/entity/aggregateRoot.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value_object/id.valueObject';
import Client from './client.entity';
import Product from './product.entity';

interface IOrderProps {
  id?: Id;
  client: Client;
  products: Product[];
  status?: string;
}

export default class Order extends BaseEntity implements IAggregateRoot {
  private _client: Client;
  private _products: Product[];
  private _status: string;

  constructor(props: IOrderProps) {
    super(props.id);
    this._client = props.client;
    this._products = props.products;
    this._status = props.status || 'pending';
  }

  get client() {
    return this._client;
  }

  get products() {
    return this._products;
  }

  get status() {
    return this._status;
  }

  get total() {
    return this._products.reduce((acc, product) => {
      acc += product.salesPrice;
      return acc;
    }, 0);
  }
}
