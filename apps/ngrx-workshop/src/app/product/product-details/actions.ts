import { createAction, props } from '@ngrx/store';
import { ProductRating } from '@ngrx-nx-workshop/api-interfaces';

export const addToCart = createAction(
  '[Product Details Page] Add to cart button clicked',
  props<{ productId: string }>()
);

export const productDetailsOpened = createAction(
  '[Product Details Page] Opened'
);

export const rateProduct = createAction(
  '[Product Details Page] product rated',
  props<ProductRating>()
);
