import { CartItem } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const timerTick = createAction('[Cart Effects] periodic timer tick');

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemsError = createAction(
  '[Cart API] fetch items error',
  props<{ errorMessage: string }>()
);

export const addToCartSuccess = createAction('[Cart API] add product success');

export const addToCartError = createAction(
  '[Cart API] add product error',
  props<{ productId: string; errorMessage: string }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart API] remove product success'
);

export const removeSingleFromCartError = createAction(
  '[Cart API] remove product error',
  props<{ productId: string; errorMessage: string }>()
);

export const removeAllFromCartSuccess = createAction(
  '[Cart API] remove all products success'
);

export const removeAllFromCartError = createAction(
  '[Cart API] remove all products error',
  props<{
    cartItems: { [productId: string]: number } | undefined;
    errorMessage: string;
  }>()
);

export const purchaseSuccess = createAction('[Cart API] purchase success');

export const purchaseError = createAction(
  '[Cart API] purchase error',
  props<{ errorMessage: string }>()
);
