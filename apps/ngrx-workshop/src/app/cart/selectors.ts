import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, CartState } from './reducer';

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const getCartItems = createSelector(
  cartFeature,
  state => state.cartItems
);

export const getCartItemsCount = createSelector(
  getCartItems,
  cartItems =>
    cartItems
      ? Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0)
      : 0
);
