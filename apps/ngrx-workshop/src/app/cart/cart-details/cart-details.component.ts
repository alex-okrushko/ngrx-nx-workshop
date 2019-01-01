import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CartProduct } from '../../model/product';
import { Store } from '@ngrx/store';

import * as actions from './actions';
import * as selectors from '../selectors';

@Component({
  selector: 'ngrx-nx-workshop-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
  cartDetailsVm$ = this.store.select(selectors.cartDetailsVm);

  constructor(private readonly store: Store) {
    this.store.dispatch(actions.pageOpened());
  }

  removeOne(productId: string) {
    this.store.dispatch(actions.removeProductClicked({ productId }));
  }

  removeAll() {
    this.store.dispatch(actions.removeAllProductsClicked());
  }

  purchase(cartProducts: CartProduct[]) {
    this.store.dispatch(actions.purchaseClicked({ cartProducts }));
  }
}
