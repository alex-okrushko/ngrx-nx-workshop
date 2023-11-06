import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';

import { productDetailsStore } from './product-details.store';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [productDetailsStore],
})
export class ProductDetailsComponent {
  readonly productDetailsStore = inject(productDetailsStore);

  constructor(
    private readonly location: Location,
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
