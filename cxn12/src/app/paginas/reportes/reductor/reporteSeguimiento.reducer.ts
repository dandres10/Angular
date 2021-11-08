import { SeguimientoCelulaResponse } from '../../../modelos/reportes/celulas/response/seguimientoCelulaResponse';
import { createReducer, on } from '@ngrx/store';
import { crearReporteSeguimientoCelula, limpiarReporteSeguimientoCelula } from './reporteSeguimiento.actions';

export const estadoIncial: SeguimientoCelulaResponse[] = [];

const _reporteSeguimientoCelulaReducer= createReducer(
    estadoIncial,
    on(crearReporteSeguimientoCelula, (state, listaReporteSeguimientoCelula) => [
      ...state,
      listaReporteSeguimientoCelula,
    ]),
    on(limpiarReporteSeguimientoCelula, (state) => estadoIncial)
  
    
  );
  
  export function reporteSeguimientoCelulaReducer(state, action) {
    return _reporteSeguimientoCelulaReducer(state, action);
  }