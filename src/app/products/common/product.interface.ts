export interface Entity {
  id: string;
}

export interface ProductDto extends Entity {
  title: string;
  description: string;
  views: number;

  createdAt: string;
  updatedAt: string;
}

export interface Product extends ProductDto {}

export interface ProductCreate {
  title: string;
  description: string;
}

export type ProductChange = Partial<ProductCreate> & Entity;
