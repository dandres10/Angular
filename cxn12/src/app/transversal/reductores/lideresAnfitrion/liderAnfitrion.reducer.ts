import { ListaLiderAnfitrionResponse } from '../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';
import { createReducer, on } from '@ngrx/store';
import {
  crearLiderAnfitrion,
  editarLiderAnfitrion,
  limpiarLiderAnfitrion,
} from './liderAnfitrion.actions';

export const estadoIncial: ListaLiderAnfitrionResponse[] = [];

const _liderAnfitrionReducer = createReducer(
  estadoIncial,
  on(crearLiderAnfitrion, (state, ListaLiderAnfitrionResponse) => [
    ...state,
    ListaLiderAnfitrionResponse,
  ]),

  on(editarLiderAnfitrion, (state, ListaLiderAnfitrionResponse) => {
    return state.map((liderAnfitrion) => {
      if (liderAnfitrion.idHost === ListaLiderAnfitrionResponse.idHost) {
        return {
          ...liderAnfitrion = ListaLiderAnfitrionResponse
        };
      } else {
        return liderAnfitrion;
      }
    });
  }),

  on(limpiarLiderAnfitrion, (state) => estadoIncial)
);

export function liderAnfitrionReducer(state, action) {
  return _liderAnfitrionReducer(state, action);
}
