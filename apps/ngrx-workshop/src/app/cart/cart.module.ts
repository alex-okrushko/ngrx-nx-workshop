import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CartEffects } from './cart.effects';
import { cartReducer, CART_FEATURE_KEY } from './cart.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
})
export class CartModule {}
