import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { RatingService } from '../rating.service';
import { Store } from '@ngrx/store';

import * as actions from './actions';
import * as selectors from '../selectors';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  product$ = this.store.select(selectors.getCurrentProduct);

  private customerRating$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private readonly ratingService: RatingService,
    private readonly location: Location,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.productDetailsOpened());
    this.subscription.add(
      this.store
        .select(selectors.getCurrentProductId)
        .pipe(
          filter((id): id is string => id != null),
          switchMap(id => this.ratingService.getRating(id))
        )
        .subscribe(productRating =>
          this.customerRating$.next(productRating && productRating.rating)
        )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setRating(productId: string, rating: Rating) {
    this.ratingService
      .setRating({ productId, rating })
      .pipe(
        map(arr =>
          arr.find(productRating => productId === productRating.productId)
        ),
        filter(
          (productRating): productRating is NonNullable<typeof productRating> =>
            productRating != null
        ),
        map(productRating => productRating.rating)
      )
      .subscribe(newRating => this.customerRating$.next(newRating));
  }

  addToCart(productId: string) {
    this.store.dispatch(actions.addToCart({ productId }));
  }

  back() {
    this.location.back();
  }
}
