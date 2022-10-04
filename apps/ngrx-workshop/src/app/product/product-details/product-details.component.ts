import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';

import { ProductDetailsStore } from './product-details.store';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ProductDetailsStore],
})
export class ProductDetailsComponent {
  readonly vm$ = this.productDetailsStore.vm$;

  constructor(
    private readonly location: Location,
    private readonly productDetailsStore: ProductDetailsStore
  ) {}

  addToCart(productId: string) {
    this.productDetailsStore.addToCart(productId);
  }

  back() {
    this.location.back();
  }

  submit(review: { reviewer: string; reviewText: string }) {
    this.productDetailsStore.postReview(review);
  }

  setRating(rating: Rating) {
    this.productDetailsStore.setRating(rating);
  }
}
