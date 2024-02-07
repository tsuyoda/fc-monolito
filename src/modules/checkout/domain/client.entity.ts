import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value_object/id.valueObject';

type IClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
};

export default class Client extends BaseEntity {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: IClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
  }
}
