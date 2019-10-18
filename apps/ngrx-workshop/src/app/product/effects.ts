import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';

import * as productListActions from './product-list/actions';
import * as apiActions from './actions';
import { ProductService } from './product.service';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService
  ) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productService
          .getProducts()
          .pipe(map(products => apiActions.productsFetched({ products })))
      )
    )
  );
}
