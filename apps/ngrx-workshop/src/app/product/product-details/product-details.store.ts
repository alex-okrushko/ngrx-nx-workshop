import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Rating, Review } from '@ngrx-nx-workshop/api-interfaces';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, pipe, switchMap, tap } from 'rxjs';
import {
  selectCurrentProduct,
  selectCurrentProductId,
} from '../product.selectors';
import { RatingService } from '../rating.service';
import { RatingsStore } from '../ratings.store';
import * as actions from './actions';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

type ProductDetailsState = {
  reviews: Review[];
};

export const productDetailsStore = signalStore(
  withState<ProductDetailsState>({
    reviews: [],
  }),
  withMethods((detailsStore) => {
    const store = inject(Store);
    const ratingsStore = inject(RatingsStore);
    const ratingService = inject(RatingService);
    const productId = store.selectSignal(selectCurrentProductId);

    const fetchReviews = rxMethod<string>((productId$) => {
      return productId$.pipe(
        switchMap((productId) =>
          ratingService.getReviews(productId).pipe(
            tapResponse(
              (reviews) => patchState(detailsStore, { reviews }),
              (e) => console.log(e)
            )
          )
        )
      );
    });
    return {
      setRating: (rating: Rating) => {
        ratingsStore.setRating({ rating, productId: productId() });
      },
      fetchReviews,
      postReview: rxMethod<{ reviewer: string; reviewText: string }>(
        (review$) => {
          return review$.pipe(
            switchMap((review) =>
              ratingService
                .postReview({ productId: productId()!, ...review })
                .pipe(
                  tapResponse(
                    () => fetchReviews(productId()!),
                    (e) => console.log(e)
                  )
                )
            )
          );
        }
      ),
      addToCart: (productId: string) => {
        store.dispatch(actions.addToCart({ productId }));
      },
    };
  }),
  withComputed(() => ({
    product: inject(Store).selectSignal(selectCurrentProduct),
    rating: toSignal(
      inject(RatingsStore).selectRating(
        inject(Store).selectSignal(selectCurrentProductId)()!
      )
    ),
  })),
  withHooks({
    onInit: (detailsStore) => {
      const store = inject(Store);
      const ratingsStore = inject(RatingsStore);
      const productId = store.selectSignal(selectCurrentProductId);

      store.dispatch(actions.productDetailsOpened());
      detailsStore.fetchReviews(productId()!);
      ratingsStore.fetchRating(productId()!);
    },
  })
);
