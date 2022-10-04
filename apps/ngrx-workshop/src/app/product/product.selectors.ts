import { ProductState } from './product.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PRODUCT_FEATURE_KEY } from './product.reducer';
import { selectRouterParam } from '../router/router.selectors';

const getProductState =
  createFeatureSelector<ProductState>(PRODUCT_FEATURE_KEY);

export const selectProducts = createSelector(
  getProductState,
  (state) => state.products
);

export const selectCurrentProductId = selectRouterParam('productId');

export const selectCurrentProduct = createSelector(
  selectProducts,
  selectCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products.find((p) => p.id === id);
  }
);
