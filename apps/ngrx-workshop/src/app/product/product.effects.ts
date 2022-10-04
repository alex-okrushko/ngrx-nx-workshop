import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as apiActions from './actions';
import * as productDetailsActions from './product-details/actions';
import * as productListActions from './product-list/actions';
import { selectCurrentProductId } from './product.selectors';
import { ProductService } from './product.service';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => apiActions.productsFetchedSuccess({ products })),
          catchError(() =>
            of(
              apiActions.productsFetchedError({
                errorMessage: 'Error Fetching Products',
              })
            )
          )
        )
      )
    );
  });

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.productDetailsOpened),
      concatLatestFrom(() =>
        this.store
          .select(selectCurrentProductId)
          .pipe(filter((id): id is string => id != null))
      ),
      switchMap(([, id]) =>
        this.productService.getProduct(id).pipe(
          map((product) => apiActions.singleProductFetchedSuccess({ product })),
          catchError(() =>
            of(
              apiActions.singleProductFetchedError({
                errorMessage: 'Error Fetching Single Product',
              })
            )
          )
        )
      )
    );
  });
}
