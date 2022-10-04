import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ProductModel } from '../model/product';
import { CallState, LoadingState } from '../shared/call-state';
import * as apiActions from './actions';
import * as productListActions from './product-list/actions';

export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState {
  products: EntityState<ProductModel>;
  productsCallState: CallState;
}

// If your entity's id property is different you can specify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<ProductModel> =
  createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  productsCallState: LoadingState.INIT,
};

export const productsReducer = createReducer(
  initState,
  on(productListActions.productsOpened, (state) => ({
    ...state,
    productsCallState: LoadingState.LOADING,
  })),
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: productAdapter.upsertMany(products, state.products),
    productsCallState: LoadingState.LOADED,
  })),
  on(apiActions.productsFetchedError, (state, { errorMessage }) => ({
    ...state,
    productsCallState: { errorMessage },
  })),
  on(apiActions.singleProductFetchedSuccess, (state, { product }) => ({
    ...state,
    products: productAdapter.upsertOne(product, state.products),
  }))
);
