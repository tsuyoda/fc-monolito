import Address from '../../@shared/domain/value_object/address.valueObject';

export interface IAddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: Address;
}

export interface IFindClientFacadeInputDto {
  id: string;
}

export interface IFindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IClientAdmFacade {
  add(input: IAddClientFacadeInputDto): Promise<void>;
  find(input: IFindClientFacadeInputDto): Promise<IFindClientFacadeOutputDto>;
}
