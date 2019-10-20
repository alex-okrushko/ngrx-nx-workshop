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
  })),
  on(actions.addToCartError, (state, { productId }) => {
    const currentQuantity = state.cartItems && state.cartItems[productId];
    const newCartItems = {...state.cartItems};
    if (currentQuantity && currentQuantity > 1) {
      newCartItems[productId] = currentQuantity - 1;
    } else {
      delete newCartItems[productId];
    }
    return {
      ...state,
      cartItems: newCartItems,
    };
  })
);

export function reducer(state: CartState | undefined, action: Action) {
  return cartReducer(state, action);
}
