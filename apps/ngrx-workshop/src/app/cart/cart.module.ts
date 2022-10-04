import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { cartReducer, CART_FEATURE_KEY } from './cart.reducer';

@NgModule({
  imports: [StoreModule.forFeature(CART_FEATURE_KEY, cartReducer)],
})
export class CartModule {}
