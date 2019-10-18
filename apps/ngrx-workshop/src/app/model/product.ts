import { BasicProduct } from '@ngrx-nx-workshop/api-interfaces';

export interface CartProduct extends BasicProduct {
  quantity: number;
}
