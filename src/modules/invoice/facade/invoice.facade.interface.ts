export interface IGenerateInvoiceFacadeInputDto {
  name: string;
  document: string;
  address: {
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface IFindInvoiceFacadeInputDto {
  id: string;
}

export interface IFindInvoiceFacadeOutputDto {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IInvoiceFacade {
  generate(input: IGenerateInvoiceFacadeInputDto): Promise<void>;
  find(input: IFindInvoiceFacadeInputDto): Promise<IFindInvoiceFacadeOutputDto>;
}
