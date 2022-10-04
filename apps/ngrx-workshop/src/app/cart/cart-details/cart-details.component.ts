import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';

import { CartProduct } from '../../model/product';
import { selectCartProducts, selectCartTotal } from '../cart.selectors';
import { CartService } from '../cart.service';
import * as actions from './actions';

export const cartDetailsVm = createSelector(
  selectCartProducts,
  selectCartTotal,
  (products, total) => ({ products, total })
);

@Component({
  selector: 'ngrx-nx-workshop-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent {
  cartDetailsVm$: Observable<{
    products?: CartProduct[];
    total?: number;
  }> = this.store.select(cartDetailsVm);

  constructor(
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.pageOpened());
  }

  removeOne(id: string) {
    this.cartService.removeProduct(id);
  }

  removeAll() {
    this.cartService.removeAll();
  }

  purchase(products: CartProduct[]) {
    this.cartService
      .purchase(
        products.map(({ id, quantity }) => ({ productId: id, quantity }))
      )
      // 👇 really important not to forget to subscribe
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.store.dispatch(actions.purchaseSuccess());
          this.router.navigateByUrl('');
        } else {
          this.snackBar.open('Purchase error', 'Error', {
            duration: 2500,
          });
        }
      });
  }
}
