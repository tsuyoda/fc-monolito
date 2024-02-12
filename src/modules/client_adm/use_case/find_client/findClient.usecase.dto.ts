export interface IFindClientUseCaseInputDto {
  id: string;
}

interface IAddress {
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IFindClientUseCaseOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
}
