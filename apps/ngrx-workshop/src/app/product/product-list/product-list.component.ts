import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicProduct, ProductRating } from '@ngrx-nx-workshop/api-interfaces';
import { Store } from '@ngrx/store';
import { productsOpened } from './actions';

import * as selectors from '../selectors';
import { CallState, LoadingState } from '../../shared/call_state';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products$: Observable<BasicProduct[] | undefined> = this.store.select(
    selectors.getProducts
  );
  productsCallState$: Observable<CallState> = this.store.select(
    selectors.getProductsCallState
  );

  // Make LoadingState be available in the template.
  readonly LoadingState = LoadingState;

  customerRatings$: Observable<Dictionary<ProductRating>> = this.store.select(
    selectors.getRatingsEntities
  );

  constructor(private readonly store: Store) {
    this.store.dispatch(productsOpened());
  }
}
