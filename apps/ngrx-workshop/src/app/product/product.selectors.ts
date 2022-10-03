import { GlobalState } from './product.reducer';

export function selectProducts(state: GlobalState) {
    return state.product.products;
}