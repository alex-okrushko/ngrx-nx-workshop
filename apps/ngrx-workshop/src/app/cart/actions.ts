import { createAction, props } from '@ngrx/store';
import { CartItem } from '@ngrx-nx-workshop/api-interfaces';

export const timerTick = createAction('[Cart Effects] perioding timer tick');

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemsError = createAction('[Cart API] fetch items error');

export const addToCartSuccess = createAction('[Cart API] add product success');

export const addToCartError = createAction(
  '[Cart API] add product error',
  props<{ productId: string }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart API] remove product success'
);

export const removeFromCartError = createAction(
  '[Cart API] remove product error',
  props<{ productId: string }>()
);

export const removeAllFromCartSuccess = createAction(
  '[Cart API] remove all products success'
);

export const removeAllFromCartError = createAction(
  '[Cart API] remove all products error',
  props<{ cartItems: { [productId: string]: number } | undefined }>()
);

export const purchaseSuccess = createAction('[Cart API] purchase success');

export const purchaseError = createAction('[Cart API] purchase error');
