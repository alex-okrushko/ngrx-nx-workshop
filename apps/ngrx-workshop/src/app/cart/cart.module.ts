import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CART_FEATURE_KEY, reducer } from './reducer';
import { CartEffects } from './effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forFeature(CART_FEATURE_KEY, reducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule {}
