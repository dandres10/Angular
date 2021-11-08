import { createReducer, on } from '@ngrx/store';
import { estadoCargador } from './master.reducer';

export const estadoIncial = false;

const _estadoCargadorReducer = createReducer(
  estadoIncial,
    on(estadoCargador, (state, {estado}) => state = estado)
);

export function estadoCargadorReducer(state, action) {
  return _estadoCargadorReducer(state, action);
}
