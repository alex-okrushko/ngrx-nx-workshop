import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicProduct, Rating } from '@ngrx-nx-workshop/api-interfaces';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$?: Observable<BasicProduct[]>;
  customerRatings$?: Observable<{[productId: string]: Rating}>;

  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();

    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map(ratingsArray => 
        // Convert from Array to Indexable.
        ratingsArray.reduce((acc: {[productId: string]: Rating}, ratingItem) => {
          acc[ratingItem.productId] = ratingItem.rating;
          return acc;
        }, {})),
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  }
}
