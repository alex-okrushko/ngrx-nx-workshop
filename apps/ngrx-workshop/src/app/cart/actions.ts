import { createAction, props } from '@ngrx/store';
import { CartItem } from '@ngrx-nx-workshop/api-interfaces';

export const timerTick = createAction('[Cart Effects] perioding timer tick');

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemsError = createAction('[Cart API] fetch items error');
