import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRating } from '@ngrx-nx-workshop/api-interfaces';
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

  getRating(id: string): Observable<ProductRating | undefined> {
    return this.http.get<ProductRating | undefined>(`/api/rating/get/${id}`);
  }
}
