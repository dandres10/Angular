import { createReducer, on } from '@ngrx/store';
import {
  crearCelula,
  editarCelula,
  limpiarCelula,
  filtroEstado,
} from './celula.actions';
import { ListaCelulasResponse } from '../../../modelos/celula/response/listaCelulasResponse';
import { state } from '@angular/animations';

export const estadoIncial: ListaCelulasResponse[] = [];

const _celulaReducer = createReducer(
  estadoIncial,
  on(crearCelula, (state, ListaCelulasResponse) => [
    ...state,
    ListaCelulasResponse,
  ]),

  on(editarCelula, (state, ListaCelulasResponse) => {
    return state.map((celula) => {
      if (celula.id === ListaCelulasResponse.id) {
        return {
          ...(celula = ListaCelulasResponse),
        };
      } else {
        return celula;
      }
    });
  }),

  on(filtroEstado, (state, { estado }) =>
    state.map((datos) => {
      if (datos.status === estado) {
        return datos;
      }
    })
  ),

  on(limpiarCelula, (state) => estadoIncial)
);

export function celulaReducer(state, action) {
  return _celulaReducer(state, action);
}
