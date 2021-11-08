import { ListaLideresResponse } from '../../../modelos/lider/response/listaLideresResponse';
import { createReducer, on } from '@ngrx/store';
import { crearLider, editarLider, limpiarLider } from './lider.actions';

export const estadoIncial: ListaLideresResponse[] = [];

const _liderReducer = createReducer(
  estadoIncial,
  on(crearLider, (state, ListaLideresResponse) => [
    ...state,
    ListaLideresResponse,
  ]),

  on(editarLider, (state,ListaLideresResponse) => {
   
    return state.map( lider => {

      if ( lider.id === ListaLideresResponse.id  ) {
        
        return {
          ...lider = 
           ListaLideresResponse
        }
        
      } else {
        return lider;
      }

    });
  }),

  on(limpiarLider, state => estadoIncial)
);

export function liderReducer(state, action) {
  return _liderReducer(state, action);
}