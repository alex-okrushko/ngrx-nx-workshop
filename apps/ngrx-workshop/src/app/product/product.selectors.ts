import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterParam } from '../router/router.selectors';
import { ProductState, PRODUCT_FEATURE_KEY } from './product.reducer';

const selectProductState =
  createFeatureSelector<ProductState>(PRODUCT_FEATURE_KEY);

export const selectProducts = createSelector(
  selectProductState,
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
