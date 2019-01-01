import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './effects';
import { reducer, PRODUCT_FEATURE_KEY } from './reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(PRODUCT_FEATURE_KEY, reducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductModule {}
