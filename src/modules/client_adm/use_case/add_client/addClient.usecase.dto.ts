import Address from '../../../@shared/domain/value_object/address.valueObject';

export interface IAddClientInputDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: Address;
}

export interface IAddClientOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}
