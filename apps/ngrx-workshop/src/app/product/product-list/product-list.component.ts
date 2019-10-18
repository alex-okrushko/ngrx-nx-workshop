import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  BasicProduct,
  Rating,
  Product
} from '@ngrx-nx-workshop/api-interfaces';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<BasicProduct[]> = this.store.select(
    state => state.product.products
  );
  customerRatings$?: Observable<Map<string, Rating>>;

  constructor(
    private readonly store: Store<{ product: { products: Product[] } }>,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit() {
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map(arr => {
        const ratingsMap = new Map<string, Rating>();
        for (const productRating of arr) {
          ratingsMap.set(productRating.productId, productRating.rating);
        }
        return ratingsMap;
      }),
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  }
}
