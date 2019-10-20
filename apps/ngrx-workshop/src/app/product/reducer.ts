import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import * as apiActions from './actions';

export interface GlobalState {
  product: ProductState;
}

export interface ProductState {
  products?: Product[];
}
const initState: ProductState = {
  products: undefined
};

const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    products: [...products]
  })),
  on(apiActions.productsFetchedError, state => ({
    products: []
  })),
  on(apiActions.productFetchedSuccess, (state, { product }) => {
    const productsClone = state.products ? [...state.products] : [];
    const indexOfProduct = productsClone.findIndex(p => p.id === product.id);
    // Remove old one and replace with single product fetch,
    productsClone.splice(indexOfProduct, 1, product);
    return {
      ...state,
      products: productsClone
    };
  })
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productsReducer(state, action);
}
