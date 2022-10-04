import { createReducer, on } from '@ngrx/store';

import * as productDetailsActions from '../product/product-details/actions';
import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';

export const CART_FEATURE_KEY = 'cart';

export interface CartState {
  // Represents the Indexable of productId and quantity
  cartItems?: { [productId: string]: number };
}

export const initialState: CartState = {
  cartItems: undefined,
};

export const cartReducer = createReducer(
  initialState,
  on(
    productDetailsActions.addToCart,
    actions.removeSingleFromCartError,
    (state, { productId }) => {
      const newQuantity =
        state.cartItems && state.cartItems[productId]
          ? state.cartItems[productId] + 1
          : 1;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [productId]: newQuantity,
        },
      };
    }
  ),
  on(actions.fetchCartItemsSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems: cartItems.reduce(
      (acc: { [productId: string]: number }, { productId, quantity }) => {
        acc[productId] = quantity;
        return acc;
      },
      {}
    ),
  })),
  on(actions.removeAllFromCartError, (state, { cartItems }) => ({
    ...state,
    cartItems: { ...cartItems },
  })),
  on(
    actions.addToCartError,
    cartDetailsActions.removeProductClicked,
    (state, { productId }) => {
      const currentQuantity = state.cartItems && state.cartItems[productId];
      const newCartItems = { ...state.cartItems };
      if (currentQuantity && currentQuantity > 1) {
        newCartItems[productId] = currentQuantity - 1;
      } else {
        delete newCartItems[productId];
      }
      return {
        ...state,
        cartItems: newCartItems,
      };
    }
  ),
  on(
    cartDetailsActions.removeAllProductsClicked,
    actions.purchaseSuccess,
    (state) => ({
      ...state,
      cartItems: {},
    })
  )
);
