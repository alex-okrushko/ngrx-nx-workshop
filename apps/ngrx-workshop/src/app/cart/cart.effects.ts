import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from './cart.service';

import { catchError, defer, map, of, switchMap, timer } from 'rxjs';
import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';

const REFRESH_CART_ITEMS_INTERVAL_MS = 20 * 1000; // 20 seconds

@Injectable()
export class CartEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService
  ) {}

  fetchCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        this.cartService.getCartProducts().pipe(
          map((cartItems) => actions.fetchCartItemsSuccess({ cartItems })),
          catchError(() =>
            of(
              actions.fetchCartItemsError({
                errorMessage: 'Error Fetching Cart Items',
              })
            )
          )
        )
      )
    );
  });

  init$ = createEffect(() =>
    defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    )
  );
}
