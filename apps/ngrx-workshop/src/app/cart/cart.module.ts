import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CART_FEATURE_KEY, reducer } from './reducer';

@NgModule({
  imports: [StoreModule.forFeature(CART_FEATURE_KEY, reducer)]
})
export class CartModule {}
