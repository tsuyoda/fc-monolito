export interface ICheckStockInputDto {
  productId: string;
}

export interface ICheckStockOutputDto {
  productId: string;
  stock: number;
}
