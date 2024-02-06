export interface IFindStoreCatalogFacadeInputDto {
  productId: string;
}

export interface IFindStoreCatalogFacadeOutputDto {
  id: string;
  productId: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface IFindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    productId: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface IStoreCatalogFacade {
  findByProductId(
    productId: IFindStoreCatalogFacadeInputDto,
  ): Promise<IFindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<IFindAllStoreCatalogFacadeOutputDto>;
}
