import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { CartIconModule } from './cart/cart-icon/cart-icon.module';
import { CartModule } from './cart/cart.module';
import { ErrorEffects } from './error.effects';
import { ProductEffects } from './product/product.effects';
import {
  productsReducer,
  PRODUCT_FEATURE_KEY,
} from './product/product.reducer';
import { RoutingModule } from './router/routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    CartIconModule,
    MatToolbarModule,
    StoreModule.forRoot({ [PRODUCT_FEATURE_KEY]: productsReducer }),
    EffectsModule.forRoot([ProductEffects, ErrorEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    CartModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
