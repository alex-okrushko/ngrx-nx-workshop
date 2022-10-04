import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';

import { selectCurrentProduct } from '../product.selectors';
import { RatingService } from '../rating.service';

import * as actions from './actions';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  private readonly productId$ = this.router.paramMap.pipe(
    map((params: ParamMap) => params.get('productId')),
    filter((id: string | null): id is string => !!id),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  product$ = this.store.select(selectCurrentProduct);

  readonly reviewsRefresh$ = new BehaviorSubject<void>(undefined);

  readonly reviews$ = combineLatest([
    this.productId$,
    this.reviewsRefresh$,
  ]).pipe(switchMap(([id]) => this.ratingService.getReviews(id)));

  protected customerRating$ = new BehaviorSubject<number | undefined>(
    undefined
  );

  constructor(
    private readonly router: ActivatedRoute,
    private readonly ratingService: RatingService,
    private readonly location: Location,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.productDetailsOpened());

    this.productId$
      .pipe(switchMap((id) => this.ratingService.getRating(id)))
      .subscribe((productRating) =>
        this.customerRating$.next(productRating && productRating.rating)
      );
  }

  setRating(productId: string, rating: Rating) {
    this.ratingService
      .setRating({ productId, rating })
      .pipe(
        map((arr) =>
          arr.find((productRating) => productId === productRating.productId)
        ),
        filter(
          (productRating): productRating is NonNullable<typeof productRating> =>
            productRating != null
        ),
        map((productRating) => productRating.rating)
      )
      .subscribe((newRating) => this.customerRating$.next(newRating));
  }

  addToCart(productId: string) {
    this.store.dispatch(actions.addToCart({ productId }));
  }

  back() {
    this.location.back();
  }

  submit(review: { reviewer: string; reviewText: string }) {
    this.productId$
      .pipe(
        take(1),
        concatMap((productId) =>
          this.ratingService.postReview({
            productId,
            ...review,
          })
        )
      )
      .subscribe(() => {
        this.reviewsRefresh$.next();
      });
  }
}
