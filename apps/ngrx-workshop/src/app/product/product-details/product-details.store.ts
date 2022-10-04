import { Injectable } from '@angular/core';
import { Rating, Review } from '@ngrx-nx-workshop/api-interfaces';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';
import {
  selectCurrentProduct,
  selectCurrentProductId,
} from '../product.selectors';
import { RatingService } from '../rating.service';
import * as actions from './actions';

interface ProductDetailsState {
  reviews?: Review[];
  rating?: number;
}

@Injectable()
export class ProductDetailsStore extends ComponentStore<ProductDetailsState> {
  constructor(
    private readonly store: Store,
    private readonly ratingService: RatingService
  ) {
    super({});
    this.store.dispatch(actions.productDetailsOpened());

    // This re-fetches reviews whenever productId changes.
    this.fetchReviews(this.productId$);
    this.fetchRating(this.productId$);
  }

  private readonly productId$ = this.store
    .select(selectCurrentProductId)
    .pipe(filter((id): id is string => id != null));

  readonly vm$ = this.select(
    this.state$,
    this.store.select(selectCurrentProduct),
    ({ reviews, rating }, product) => ({ reviews, rating, product })
  );

  readonly fetchRating = this.effect<string>((productId$) => {
    return productId$.pipe(
      switchMap((productId) =>
        this.ratingService.getRating(productId).pipe(
          tapResponse(
            (productRating) =>
              this.patchState({ rating: productRating?.rating }),
            (e) => console.log(e)
          )
        )
      )
    );
  });

  readonly setRating = this.effect<Rating>((rating$) => {
    return rating$.pipe(
      concatLatestFrom(() => this.productId$),
      switchMap(([rating, productId]) =>
        this.ratingService.setRating({ productId, rating }).pipe(
          tapResponse(
            () => this.patchState({ rating }),
            (e) => console.log(e)
          )
        )
      )
    );
  });

  readonly postReview = this.effect<{ reviewer: string; reviewText: string }>(
    (review$) => {
      return review$.pipe(
        concatLatestFrom(() => this.productId$),
        switchMap(([review, productId]) =>
          this.ratingService.postReview({ productId, ...review }).pipe(
            tapResponse(
              () => this.fetchReviews(productId),
              (e) => console.log(e)
            )
          )
        )
      );
    }
  );

  readonly fetchReviews = this.effect<string>((productId$) => {
    return productId$.pipe(
      switchMap((productId) =>
        this.ratingService.getReviews(productId).pipe(
          tapResponse(
            (reviews) => this.patchState({ reviews }),
            (e) => console.log(e)
          )
        )
      )
    );
  });

  addToCart(productId: string) {
    this.store.dispatch(actions.addToCart({ productId }));
  }
}
