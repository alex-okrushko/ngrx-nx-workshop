import { createFeatureSelector } from '@ngrx/store';
import {
  RouterReducerState,
  MinimalRouterStateSnapshot,
  getRouterSelectors,
} from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export const routerFeatureState =
  createFeatureSelector<RouterReducerState<MinimalRouterStateSnapshot>>(
    ROUTER_FEATURE_KEY
  );

export const selectRouterParam =
  getRouterSelectors(routerFeatureState).selectRouteParam;
