import { Injectable, ApplicationRef } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, exhaustMap, catchError } from 'rxjs/operators';

import * as productListActions from './product-list/actions';
import * as apiActions from './actions';
import { ProductService } from './product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListActions.productsOpened),
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
}
