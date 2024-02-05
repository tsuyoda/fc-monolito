import Address from '../../../@shared/domain/value_object/address.valueObject';

export interface IFindClientUseCaseInputDto {
  id: string;
}

export interface IFindClientUseCaseOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}
