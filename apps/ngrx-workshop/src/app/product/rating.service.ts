import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRating, Review } from '@ngrx-nx-workshop/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RatingService {
  constructor(private readonly http: HttpClient) {}

  setRating(productRating: ProductRating): Observable<ProductRating[]> {
    return this.http.post<ProductRating[]>(
      `/api/rating/set/${productRating.productId}`,
      productRating
    );
  }

  getRatings(): Observable<ProductRating[]> {
    return this.http.get<ProductRating[]>('/api/rating/get-ratings');
  }

  getRating(productId: string): Observable<ProductRating | undefined> {
    return this.http.get<ProductRating | undefined>(`/api/rating/get/${productId}`);
  }

  getReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`/api/reviews/get/${productId}`);
  }

  postReview(review: Pick<Review, 'productId'|'reviewText'|'reviewer'>): Observable<Review> {
    return this.http.post<Review>(`/api/reviews/post/${review.productId}`, review);
  }
}
