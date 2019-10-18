import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ProductDetailsComponent } from './product-details.component';
import { StarsModule } from '../../common/stars/stars.module';
import { SpinnerModule } from '../../common/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    StarsModule,
    MatProgressBarModule,
    SpinnerModule
  ],
  declarations: [ProductDetailsComponent]
})
export class ProductDetailsModule {}
