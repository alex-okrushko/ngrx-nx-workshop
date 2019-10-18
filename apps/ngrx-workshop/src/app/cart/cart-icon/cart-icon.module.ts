import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CartIconComponent } from './cart-icon.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  declarations: [CartIconComponent],
  exports: [CartIconComponent]
})
export class CartIconModule {}
