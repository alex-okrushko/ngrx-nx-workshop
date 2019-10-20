import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, CartState } from './reducer';

import * as productSelectors from '../product/selectors';
import { CartProduct } from '../model/product';

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

export const getCartProducts = createSelector(
  productSelectors.getProducts,
  getCartItems,
  (products, cartItems) => {
    if (!cartItems || !products) return undefined;
    return Object.entries(cartItems)
      .map(([id, quantity]): CartProduct | undefined => {
        const product = products.find(p => p.id === id);
        if (!product) return undefined;
        return {
          ...product,
          quantity
        };
      })
      .filter((cartProduct): cartProduct is CartProduct => !!cartProduct);
  }
);

export const getCartTotal = createSelector(
  getCartProducts,
  cartItems =>
    cartItems &&
    cartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
);

export const cartDetailsVm = createSelector(
  getCartProducts,
  getCartTotal,
  (products, total) => ({products, total})
)
