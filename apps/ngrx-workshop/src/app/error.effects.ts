import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as cartApiActions from './cart/actions';
import * as productApiActions from './product/actions';

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
          cartApiActions.addToCartError,
          productApiActions.singleProductFetchedError
        ),
        tap(({ errorMessage }) => {
          this.snackBar.open(errorMessage, 'Error', {
            duration: 2500,
          });
        })
      );
    },
    { dispatch: false }
  );
}
