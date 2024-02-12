export interface IAddCatalogInputDto {
  id?: string;
  productId: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface IAddCatalogOutputDto {
  id: string;
  productId: string;
  name: string;
  description: string;
  salesPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
