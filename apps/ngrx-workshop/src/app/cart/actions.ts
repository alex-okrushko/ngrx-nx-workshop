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
