import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<BasicProduct[]> {
    return this.http.get<BasicProduct[]>('/api/product/product-list');
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`);
  }
}
