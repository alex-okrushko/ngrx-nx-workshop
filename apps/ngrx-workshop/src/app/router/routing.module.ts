import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartDetailsComponent } from '../cart/cart-details/cart-details.component';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductDetailsComponent } from '../product/product-details/product-details.component';
import { ProductDetailsModule } from '../product/product-details/product-details.module';
import { ProductListModule } from '../product/product-list/product-list.module';
import { CartDetailsModule } from '../cart/cart-details/cart-details.module';

const routes: Routes = [
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartDetailsComponent },
  { path: '', component: ProductListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    ProductDetailsModule,
    ProductListModule,
    CartDetailsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
