import { Injectable } from '@nestjs/common';
import { ProductRating } from '@ngrx-nx-workshop/api-interfaces';

@Injectable()
export class RatingService {
  private readonly ratings: ProductRating[] = [];

  setRating(productRating: ProductRating): ProductRating[] {
    const previousProductRating = this.ratings.find(
      rating => productRating.productId === rating.productId
    );
    if (previousProductRating) {
      previousProductRating.rating = productRating.rating;
    } else {
      this.ratings.push(productRating);
    }
    return this.ratings;
  }

  getRating(id: string): ProductRating | undefined {
    return this.ratings.find(rating => id === rating.productId);
  }

  getRatings(): ProductRating[] {
    return this.ratings;
  }
}
