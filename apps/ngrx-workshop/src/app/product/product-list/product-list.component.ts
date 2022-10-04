import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';

import * as actions from './actions';
import { Store } from '@ngrx/store';
import { selectProducts } from '../product.selectors';
import { ProductModel } from '../../model/product';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$?: Observable<ProductModel[] | undefined> =
    this.store.select(selectProducts);
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

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
