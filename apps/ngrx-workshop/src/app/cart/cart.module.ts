import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CART_FEATURE_KEY, cartReducer } from './cart.reducer';
import { CartEffects } from './cart.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
})
export class CartModule {}
