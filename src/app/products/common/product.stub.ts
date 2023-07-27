import {
  Product,
  ProductChange,
  ProductCreate,
  ProductDto,
} from './product.interface';

export const PRODUCT_DTO_STUB: ProductDto = {
  id: '7ff9cf88-ebb2-4073-bed7-21abdc9db5db',
  title: 'Awesome title',
  description: 'Great description',
  views: 10,
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
};

export const PRODUCTS_DTO_STUB = [PRODUCT_DTO_STUB];

export const PRODUCT_STUB = {
  ...PRODUCT_DTO_STUB,
};

export const PRODUCTS_STUB = [PRODUCT_STUB];

export const PRODUCTS_ENTITIES_STUB: Record<string, Product> = {
  [PRODUCT_STUB.id]: PRODUCT_STUB,
};

export const PRODUCT_CREATE: ProductCreate = {
  title: 'Incredible title',
  description: 'Beautiful description',
};

export const PRODUCT_CHANGE: ProductChange = {
  id: PRODUCT_STUB.id,
  title: 'New cool title',
  description: 'Updated description',
};
