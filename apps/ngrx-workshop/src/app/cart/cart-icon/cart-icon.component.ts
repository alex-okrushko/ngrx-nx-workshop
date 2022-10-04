import { Component } from '@angular/core';

import { CartService } from '../cart.service';
import { Store } from '@ngrx/store';

import * as cartSelectors from '../cart.selectors';

@Component({
  selector: 'ngrx-nx-workshop-cart',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent {
  cartItemsCounter$ = this.store.select(cartSelectors.selectCartItemsCount);

  constructor(private readonly store: Store) {}
}
