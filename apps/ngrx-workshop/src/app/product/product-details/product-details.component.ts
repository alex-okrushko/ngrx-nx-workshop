import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as actions from './actions';
import * as selectors from '../selectors';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product$ = this.store.select(selectors.getCurrentProduct);

  customerRating$: Observable<number | undefined> = this.store.select(
    selectors.getCurrentProductRating
  );

  constructor(
    private readonly location: Location,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.productDetailsOpened());
  }

  setRating(id: string, rating: Rating) {
    this.store.dispatch(actions.rateProduct({ productId: id, rating }));
  }

  addToCart(productId: string) {
    this.store.dispatch(actions.addToCart({ productId }));
  }

  back() {
    this.location.back();
  }
}
