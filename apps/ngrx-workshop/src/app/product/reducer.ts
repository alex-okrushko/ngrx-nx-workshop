import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import * as apiActions from './actions';
import { CallState, LoadingState } from '../shared/call_state';
import { ProductRating } from '@ngrx-nx-workshop/api-interfaces';

export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState {
  products: EntityState<Product>;
  productsCallState: CallState;
  customerRatings: EntityState<ProductRating>;
}

// If your entity's id property is different you can spesify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<Product> = createEntityAdapter();
export const ratingsAdapter: EntityAdapter<ProductRating> = createEntityAdapter(
  {
    selectId: rating => rating.productId
  }
);

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  productsCallState: LoadingState.INIT,
  customerRatings: ratingsAdapter.getInitialState()
};

const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetch, state => ({
    ...state,
    productsCallState: LoadingState.LOADING
  })),
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: productAdapter.upsertMany(products, state.products),
    productsCallState: LoadingState.LOADED
  })),
  on(apiActions.productsFetchedError, state => ({
    ...state,
    productsCallState: { errorMsg: 'Failed loading products' }
  })),
  on(apiActions.productFetchedSuccess, (state, { product }) => ({
    ...state,
    products: productAdapter.upsertOne(product, state.products)
  })),
  on(apiActions.ratingsFetchedSuccess, (state, { ratings }) => ({
    ...state,
    customerRatings: ratingsAdapter.addAll(ratings, state.customerRatings)
  })),
  on(apiActions.ratingSingleFetchedSuccess, (state, { rating }) => ({
    ...state,
    ...(rating && {
      customerRatings: ratingsAdapter.upsertOne(rating, state.customerRatings)
    })
  }))
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productsReducer(state, action);
}
