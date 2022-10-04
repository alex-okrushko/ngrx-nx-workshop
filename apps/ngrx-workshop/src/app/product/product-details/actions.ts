import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Product Details Page] Add to cart button clicked',
  props<{ productId: string }>()
);
