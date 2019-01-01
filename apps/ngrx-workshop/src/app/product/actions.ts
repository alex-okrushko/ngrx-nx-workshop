import { createAction, props } from '@ngrx/store';
import {
  BasicProduct,
  Product,
  ProductRating
} from '@ngrx-nx-workshop/api-interfaces';

export const productsFetch = createAction('[Product Effect] fetching products');

export const productsFetchedSuccess = createAction(
  '[Product API] products fetched success',
  props<{ products: BasicProduct[] }>()
);

export const productsFetchedError = createAction(
  '[Product API] products fetching error'
);

export const productFetchedSuccess = createAction(
  '[Product API] single product fetched success',
  props<{ product: Product }>()
);

export const productFetchedError = createAction(
  '[Product API] single product fetching error'
);

export const ratingsFetchedSuccess = createAction(
  '[Product API] ratings fetched success',
  props<{ ratings: ProductRating[] }>()
);

export const ratingsFetchedError = createAction(
  '[Product API] ratings fetching error'
);

export const ratingSingleFetchedSuccess = createAction(
  '[Product API] single rating fetched success',
  props<{ rating: ProductRating | undefined }>()
);

export const ratingSingleFetchedError = createAction(
  '[Product API] single rating fetching error'
);

export const rateProductSuccess = createAction(
  '[Product API] rate product success',
  props<{ ratings: ProductRating[] }>()
);
export const rateProductError = createAction(
  '[Product API] rate product error'
);
