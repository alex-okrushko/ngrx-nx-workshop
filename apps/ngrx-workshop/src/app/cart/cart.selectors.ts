import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CART_FEATURE_KEY } from './cart.reducer';

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const selectCartItems = createSelector(
  cartFeature,
  (state) => state.cartItems
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (cartItems) =>
    cartItems
      ? Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0)
      : 0
);
