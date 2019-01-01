import { ProductState, ratingsAdapter, PRODUCT_FEATURE_KEY } from './reducer';
import * as routerSelectors from '../router/selectors';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { productAdapter } from './reducer';

const getProductState = createFeatureSelector<ProductState>(
  PRODUCT_FEATURE_KEY
);

const getProductsState = createSelector(
  getProductState,
  state => state.products
);

const getRatingsState = createSelector(
  getProductState,
  state => state.customerRatings
);

const productSelectors = productAdapter.getSelectors();
const ratingsSelectors = ratingsAdapter.getSelectors();

export const getProducts = createSelector(
  getProductsState,
  productSelectors.selectAll
);

const getProductsEntities = createSelector(
  getProductsState,
  productSelectors.selectEntities
);

export const getRatingsEntities = createSelector(
  getRatingsState,
  ratingsSelectors.selectEntities
);

export const getCurrentProductId = routerSelectors.getRouterParam('productId');

export const getCurrentProduct = createSelector(
  getProductsEntities,
  getCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products[id];
  }
);

export const getCurrentProductRating = createSelector(
  getRatingsEntities,
  getCurrentProductId,
  (ratings, id) => {
    if (id == null || !ratings) return undefined;
    const productRating = ratings[id];
    if (!productRating) return undefined;
    return productRating.rating;
  }
);

export const getProductsCallState = createSelector(
  getProductState,
  state => state && state.productsCallState
);
