import { Injectable, ApplicationRef } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  tap,
  exhaustMap,
  catchError,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import * as productListActions from './product-list/actions';
import * as productDetailsActions from './product-details/actions';
import * as apiActions from './actions';
import * as cartDetailsActions from '../cart/cart-details/actions';
import { ProductService } from './product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import * as selectors from './selectors';
import * as actions from './actions';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef,
    private readonly store: Store
  ) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListActions.productsOpened, cartDetailsActions.pageOpened),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map(products => apiActions.productsFetchedSuccess({ products })),
          catchError(() => of(apiActions.productsFetchedError()))
        )
      )
    )
  );

  handleFetchError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(apiActions.productsFetchedError),
        tap(() => {
          this.snackBar.open('Error fetching products', 'Error', {
            duration: 2500
          });
          // This is needed to trigger change detection. The other option would
          // be to wrap `open` call with setTimeout or Promise.resolve.
          this.appRef.tick();
        })
      ),
    { dispatch: false }
  );

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.productDetailsOpened),
      withLatestFrom(this.store.select(selectors.getCurrentProductId)),
      switchMap(([, id]) =>
        this.productService.getProduct(id!).pipe(
          map(product => actions.productFetchedSuccess({ product })),
          catchError(() => of(actions.productFetchedError()))
        )
      )
    );
  });

  handleFetchProductError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(apiActions.productFetchedError),
        tap(() => {
          this.snackBar.open('Error fetching product', 'Error', {
            duration: 2500
          });
          // This is needed to trigger change detection. The other option would
          // be to wrap `open` call with setTimeout or Promise.resolve.
          this.appRef.tick();
        })
      ),
    { dispatch: false }
  );
}
