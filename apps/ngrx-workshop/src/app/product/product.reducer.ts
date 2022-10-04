import { createReducer, on } from '@ngrx/store';

import { ProductModel } from '../model/product';
import * as apiActions from './actions';

export interface GlobalState {
  product: ProductState;
}

interface ProductState {
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
  }))
);
