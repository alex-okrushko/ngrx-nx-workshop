import { createReducer, on } from '@ngrx/store';

import { ProductModel } from '../model/product';
import * as apiActions from './actions';

export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState {
  products?: ProductModel[];
}
const initState: ProductState = {
  products: undefined,
};

export const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: [...products],
  })),
  on(apiActions.productsFetchedError, (state) => ({
    ...state,
    products: [],
  })),
  on(apiActions.singleProductFetchedSuccess, (state, { product }) => {
    const productsClone = state.products ? [...state.products] : [];
    const indexOfProduct = productsClone.findIndex((p) => p.id === product.id);
    // Remove old one and replace with single product fetch,
    if (indexOfProduct < 0) {
      productsClone.push(product);
    } else {
      productsClone.splice(indexOfProduct, 1, product);
    }
    return {
      ...state,
      products: productsClone,
    };
  })
);
