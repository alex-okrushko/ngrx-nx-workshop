import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';

export interface CartProduct extends BasicProduct {
  quantity: number;
}

export interface ProductModel
  extends BasicProduct,
    Partial<Pick<Product, 'description'>> {}
