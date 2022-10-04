import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { RatingService } from '../rating.service';

import { createSelector, Store } from '@ngrx/store';
import { LoadingState } from '../../shared/call-state';
import { selectProducts, selectProductsCallState } from '../product.selectors';
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
export class ProductListComponent implements OnInit {
  productListVm$ = this.store.select(productListVm);

  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  // Make LoadingState be available in the template.
  readonly LoadingState = LoadingState;

  constructor(
    private readonly store: Store,
    private readonly ratingService: RatingService
  ) {
    this.store.dispatch(actions.productsOpened());
  }

  ngOnInit() {
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((ratingsArray) =>
        // Convert from Array to Indexable.
        ratingsArray.reduce(
          (acc: { [productId: string]: Rating }, ratingItem) => {
            acc[ratingItem.productId] = ratingItem.rating;
            return acc;
          },
          {}
        )
      ),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}
