import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as productApiActions from './product/actions';
import * as cartApiActions from './cart/actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly snackBar: MatSnackBar
  ) {}

  handleFetchError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          productApiActions.productsFetchedError,
          cartApiActions.fetchCartItemsError,
          cartApiActions.addToCartError
        ),
        tap(() => {
          this.snackBar.open('Error fetching products', 'Error', {
            duration: 2500,
          });
        })
      );
    },
    { dispatch: false }
  );
}
