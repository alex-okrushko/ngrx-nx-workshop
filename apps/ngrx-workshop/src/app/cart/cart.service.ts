import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CartItem } from '@ngrx-nx-workshop/api-interfaces';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private readonly http: HttpClient) {}

  addProduct(id: string): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`/api/cart/add/${id}`, {});
  }

  removeProduct(id: string): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`/api/cart/remove/${id}`, {});
  }

  removeAll(): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`/api/cart/clear`, {});
  }

  getCartProducts(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`/api/cart/cart-content`);
  }

  purchase(purchaseItems: CartItem[]): Observable<boolean> {
    return this.http.post<boolean>(`/api/cart/purchase`, purchaseItems);
  }
}
