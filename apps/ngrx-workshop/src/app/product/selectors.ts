import { GlobalState } from './reducer';

export const getProducts = (state: GlobalState) => state.product.products;
