import { createReducer, on, Action } from '@ngrx/store';

import * as productDetailsActions from '../product/product-details/actions';
import * as actions from './actions';

export const CART_FEATURE_KEY = 'cart';

export interface CartState {
  // Represents the Indexable of productId and quantity
  cartItems?: { [productId: string]: number };
}

export const initialState: CartState = {
  cartItems: undefined
};

const cartReducer = createReducer(
  initialState,
  on(productDetailsActions.addToCart, (state, { productId }) => {
    const newQuantity =
      state.cartItems && state.cartItems[productId]
        ? state.cartItems[productId] + 1
        : 1;
    return {
      ...state,
      cartItems: {
        ...state.cartItems,
        [productId]: newQuantity
      }
    };
  }),
  on(actions.fetchCartItemsSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems: cartItems.reduce(
      (acc: { [productId: string]: number }, { productId, quantity }) => {
        acc[productId] = quantity;
        return acc;
      },
      {}
    )
  }))
);

export function reducer(state: CartState | undefined, action: Action) {
  return cartReducer(state, action);
}
