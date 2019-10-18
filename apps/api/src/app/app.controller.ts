import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors
} from '@nestjs/common';
import {
  BasicProduct,
  Product,
  ProductRating,
  CartItem
} from '@ngrx-nx-workshop/api-interfaces';

import { CartService } from './cart/cart.service';
import { DelayInterceptor } from './delay.interceptor';
import { ProductService } from './product/product.service';
import { RatingService } from './rating/rating.service';

@UseInterceptors(DelayInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly ratingService: RatingService
  ) {}

  @Get('product/product-list')
  getProductList(): BasicProduct[] {
    return this.productService.getProductList();
  }

  @Get('product/:id')
  getProduct(@Param('id') id: string): Product {
    return this.productService.getProduct(id);
  }

  @Post('cart/add/:id')
  addProduct(@Param('id') id: string): CartItem[] {
    return this.cartService.addProduct(id);
  }

  @Post('cart/remove/:id')
  removeProduct(@Param('id') id: string): CartItem[] {
    return this.cartService.removeProduct(id);
  }

  @Post('cart/clear')
  clearProducts(): CartItem[] {
    return this.cartService.removeAll();
  }

  @Get('cart/cart-content')
  getCartProducts(): CartItem[] {
    return this.cartService.getProducts();
  }

  @Post('cart/purchase')
  purchaseProducts(@Body() purchaseItems: CartItem[]): boolean {
    return this.cartService.purchaseProducts(purchaseItems);
  }

  @Post('rating/set/:id')
  setRating(@Body() productRating: ProductRating): ProductRating[] {
    return this.ratingService.setRating(productRating);
  }

  @Get('rating/get/:id')
  getRating(@Param('id') id: string): ProductRating | undefined {
    return this.ratingService.getRating(id);
  }

  @Get('rating/get-ratings')
  getRatings(): ProductRating[] {
    return this.ratingService.getRatings();
  }
}
