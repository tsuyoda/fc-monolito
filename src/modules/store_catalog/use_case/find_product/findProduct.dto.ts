export interface IFindCatalogProductInputDto {
  productId: string;
}

export interface IFindCatalogProductOutputDto {
  id: string;
  productId: string;
  name: string;
  description: string;
  salesPrice: number;
}
