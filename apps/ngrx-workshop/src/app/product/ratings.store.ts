import { Injectable } from '@angular/core';
import { ProductRating, Rating } from '@ngrx-nx-workshop/api-interfaces';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatMap, switchMap } from 'rxjs';
import { RatingService } from './rating.service';

interface RatingsState {
  [productId: string]: Rating;
}

@Injectable({
  providedIn: 'root',
})
export class RatingsStore extends ComponentStore<RatingsState> {
  constructor(private readonly ratingService: RatingService) {
    super({});
  }

  readonly fetchRating = this.effect<string>((productId$) => {
    return productId$.pipe(
      switchMap((productId) =>
        this.ratingService.getRating(productId).pipe(
          tapResponse(
            (productRating) =>
              this.patchState({ [productId]: productRating?.rating }),
            (e) => console.log(e)
          )
        )
      )
    );
  });

  readonly setRating = this.effect<ProductRating>((productRating$) => {
    return productRating$.pipe(
      concatMap(({ rating, productId }) =>
        this.ratingService.setRating({ productId, rating }).pipe(
          tapResponse(
            () => this.patchState({ [productId]: rating }),
            (e) => console.log(e)
          )
        )
      )
    );
  });

  readonly fetchAllRating = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      switchMap(() =>
        this.ratingService.getRatings().pipe(
          tapResponse(
            (productRating) =>
              this.patchState(
                productRating.reduce(
                  (acc: { [productId: string]: Rating }, productRating) => {
                    acc[productRating.productId] = productRating.rating;
                    return acc;
                  },
                  {}
                )
              ),
            (e) => console.log(e)
          )
        )
      )
    );
  });

  selectRating(productId: string) {
    return this.select((state) => state[productId]);
  }
}
