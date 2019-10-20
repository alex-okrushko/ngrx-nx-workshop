import { Injectable, ApplicationRef } from '@angular/core';
import { CartService } from './cart.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';
import * as productDetailsActions from '../product/product-details/actions';

import { switchMap, catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of, defer, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const REFRESH_CART_ITEMS_INTEVAL_MS = 20 * 1000; // 20 seconds

@Injectable()
export class CartEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}

  fetchCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        this.cartService.getCartProducts().pipe(
          map(cartItems => actions.fetchCartItemsSuccess({ cartItems })),
          catchError(() => of(actions.fetchCartItemsError()))
        )
      )
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productDetailsActions.addToCart),
      mergeMap(({ productId }) =>
        this.cartService.addProduct(productId).pipe(
          map(() => actions.addToCartSuccess()),
          // passing the productId to the Error, so it can be restored
          catchError(() => of(actions.addToCartError({ productId })))
        )
      )
    )
  );

  handleAddProductError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.addToCartError),
        tap(() => {
          this.snackBar.open('Could not add item to the cart', 'Error', {
            duration: 2500
          });
          this.appRef.tick();
        })
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTEVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    )
  );
}
