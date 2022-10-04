import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { CartService } from './cart.service';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  defer,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import * as productDetailsActions from '../product/product-details/actions';
import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';
import { selectCartItems } from './cart.selectors';

const REFRESH_CART_ITEMS_INTERVAL_MS = 20 * 1000; // 20 seconds

@Injectable()
export class CartEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  fetchCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.pageOpened,
        actions.purchaseSuccess
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

  addProductToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.addToCart),
      mergeMap(({ productId }) =>
        this.cartService.addProduct(productId).pipe(
          map(() => actions.addToCartSuccess()),
          // passing the productId to the Error, so it can be restored
          catchError(() =>
            of(
              actions.addToCartError({
                productId,
                errorMessage: 'Error Adding To Cart',
              })
            )
          )
        )
      )
    );
  });

  removeProductFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartDetailsActions.removeProductClicked),
      mergeMap(({ productId }) =>
        this.cartService.removeProduct(productId).pipe(
          map(() => actions.removeFromCartSuccess()),
          // passing the productId to the Error, so it can be restored
          catchError(() =>
            of(
              actions.removeSingleFromCartError({
                productId,
                errorMessage: 'Error Removing Single Product',
              })
            )
          )
        )
      )
    );
  });

  removeAllProductsFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartDetailsActions.removeAllProductsClicked),
      concatLatestFrom(() => this.store.select(selectCartItems)),
      exhaustMap(([, cartItems]) =>
        this.cartService.removeAll().pipe(
          map(() => actions.removeAllFromCartSuccess()),
          catchError(() =>
            of(
              actions.removeAllFromCartError({
                cartItems,
                errorMessage: 'Error Removing All Items',
              })
            )
          )
        )
      )
    );
  });

  purchaseCartProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartDetailsActions.purchaseClicked),
      map(({ cartProducts }) =>
        cartProducts.map(({ id, quantity }) => ({ productId: id, quantity }))
      ),
      exhaustMap((cartItems) =>
        this.cartService.purchase(cartItems).pipe(
          map((isSuccess) =>
            isSuccess
              ? actions.purchaseSuccess()
              : actions.purchaseError({ errorMessage: 'Purchase failed' })
          ),
          catchError(() =>
            of(actions.purchaseError({ errorMessage: 'Purchase failed' }))
          )
        )
      )
    );
  });

  purchaseSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(actions.purchaseSuccess),
        tap(() => {
          this.router.navigateByUrl('');
        })
      );
    },
    { dispatch: false }
  );

  init$ = createEffect(() =>
    defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    )
  );
}
