import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterParam } from '../router/router.selectors';
import {
  productAdapter,
  ProductState,
  PRODUCT_FEATURE_KEY,
} from './product.reducer';

const selectProductState =
  createFeatureSelector<ProductState>(PRODUCT_FEATURE_KEY);

const selectProductsState = createSelector(
  selectProductState,
  (state) => state.products
);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const selectProducts = createSelector(selectProductsState, selectAll);
const selectProductsEntities = createSelector(
  selectProductsState,
  selectEntities
);

export const selectCurrentProductId = selectRouterParam('productId');

export const selectCurrentProduct = createSelector(
  selectProductsEntities,
  selectCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products[id];
  }
);
