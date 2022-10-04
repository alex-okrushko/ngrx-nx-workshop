import { createAction, props } from '@ngrx/store';
import { CartProduct } from '../../model/product';

export const pageOpened = createAction('[Cart Details Page] page opened');

export const purchaseClicked = createAction(
  '[Cart Details Page] purchase button clicked',
  props<{ cartProducts: CartProduct[] }>()
);

export const removeProductClicked = createAction(
  '[Cart Details Page] remove product button clicked',
  props<{ productId: string }>()
);
export const removeAllProductsClicked = createAction(
  '[Cart Details Page] remove all products button clicked'
);
