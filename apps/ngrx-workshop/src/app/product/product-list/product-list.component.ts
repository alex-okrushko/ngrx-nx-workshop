import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Rating } from '@ngrx-nx-workshop/api-interfaces';

import { createSelector, Store } from '@ngrx/store';
import { LoadingState } from '../../shared/call-state';
import { selectProducts, selectProductsCallState } from '../product.selectors';
import { RatingsStore } from '../ratings.store';
import * as actions from './actions';

const productListVm = createSelector(
  selectProducts,
  selectProductsCallState,
  (products, productsCallState) => ({ products, productsCallState })
);

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  productListVm$ = this.store.select(productListVm);

  customerRatings$: Observable<{ [productId: string]: Rating }> =
    this.ratingStore.state$;

  // Make LoadingState be available in the template.
  readonly LoadingState = LoadingState;

  constructor(
    private readonly store: Store,
    private readonly ratingStore: RatingsStore
  ) {
    this.ratingStore.fetchAllRating();
    this.store.dispatch(actions.productsOpened());
  }
}
