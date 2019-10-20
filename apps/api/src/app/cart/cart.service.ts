import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CartItem } from '@ngrx-nx-workshop/api-interfaces';

@Injectable()
export class CartService {
  private cartProducts: CartItem[] = [];

  private getItem(id: string): CartItem | undefined {
    return this.cartProducts.find(cartItem => cartItem.productId === id);
  }

  addProduct(id: string): CartItem[] {
    if (Math.random() < 0.25) {
      throw new HttpException('cart failed', HttpStatus.FORBIDDEN);
    }
    const item = this.getItem(id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cartProducts.push({ productId: id, quantity: 1 });
    }
    return this.cartProducts;
  }

  removeProduct(id: string): CartItem[] {
    const item = this.getItem(id);
    if (item) {
      item.quantity -= 1;
    } else {
      this.cartProducts = this.cartProducts.filter(
        cartProduct => cartProduct.productId !== id
      );
    }
    return this.cartProducts;
  }

  removeAll(): CartItem[] {
    this.cartProducts = [];
    return this.cartProducts;
  }

  getProducts(): CartItem[] {
    return this.cartProducts;
  }

  purchaseProducts(purchaseItems: CartItem[]): boolean {
    console.log(purchaseItems.length, this.cartProducts.length);
    if (purchaseItems.length !== this.cartProducts.length) {
      return false;
    }
    for (const purchaseItem of purchaseItems) {
      const item = this.getItem(purchaseItem.productId);
      console.log(
        `${purchaseItem.productId} cart: ${item && item.quantity}, quantity: ${
          purchaseItem.quantity
        }`
      );
      if (!item || item.quantity !== purchaseItem.quantity) {
        return false;
      }
    }
    this.removeAll();
    return true;
  }
}
