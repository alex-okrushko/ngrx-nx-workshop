import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ProductModel } from '../model/product';
import * as apiActions from './actions';

export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState {
  products: EntityState<ProductModel>;
}

// If your entity's id property is different you can specify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<ProductModel> =
  createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState(),
};

export const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: productAdapter.upsertMany(products, state.products),
  })),
  on(apiActions.singleProductFetchedSuccess, (state, { product }) => ({
    ...state,
    products: productAdapter.upsertOne(product, state.products),
  }))
);
