import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { RatingService } from './rating/rating.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductService, CartService, RatingService]
})
export class AppModule {}
