import { createReducer, on } from '@ngrx/store';
import { EstadoCelulaResponse } from '../../../modelos/reportes/celulas/response/estadoCelulaResponse';
import { crearReporteCelula, limpiarReporteCelula } from './reporteCelula.actions';

export const estadoIncial: EstadoCelulaResponse[] = [];

const _reporteCelulaReducer= createReducer(
    estadoIncial,
    on(crearReporteCelula, (state, listaReporteCelula) => [
      ...state,
      listaReporteCelula,
    ]),
    on(limpiarReporteCelula, (state) => estadoIncial)
  
    
  );
  
  export function reporteCelulaReducer(state, action) {
    return _reporteCelulaReducer(state, action);
  }
  