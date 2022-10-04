import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartProduct } from '../model/product';
import * as productSelectors from '../product/product.selectors';
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

export const selectCartProducts = createSelector(
  productSelectors.selectProducts,
  selectCartItems,
  (products, cartItems) => {
    if (!cartItems || !products) return undefined;
    return Object.entries(cartItems)
      .map(([id, quantity]): CartProduct | undefined => {
        const product = products.find((p) => p.id === id);
        if (!product) return undefined;
        return {
          ...product,
          quantity,
        };
      })
      .filter((cartProduct): cartProduct is CartProduct => cartProduct != null);
  }
);

export const selectCartTotal = createSelector(
  selectCartProducts,
  (cartItems) =>
    cartItems &&
    cartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
);
