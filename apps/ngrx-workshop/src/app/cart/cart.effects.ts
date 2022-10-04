import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';
import { of, defer, timer, switchMap, catchError, map } from 'rxjs';

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
          catchError(() => of(actions.fetchCartItemsError()))
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
