import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import * as apiActions from './actions';

export interface GlobalState {
  product: ProductState;
}

export interface ProductState {
  products: EntityState<Product>;
}

// If your entity's id property is different you can spesify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<Product> = createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState()
};

const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    products: productAdapter.upsertMany(products, state.products)
  })),
  on(apiActions.productFetchedSuccess, (state, { product }) => ({
    products: productAdapter.upsertOne(product, state.products)
  }))
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productsReducer(state, action);
}
