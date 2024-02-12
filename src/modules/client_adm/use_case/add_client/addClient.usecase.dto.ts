interface IAddress {
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface IAddClientInputDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: IAddress;
}

export interface IAddClientOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
}
