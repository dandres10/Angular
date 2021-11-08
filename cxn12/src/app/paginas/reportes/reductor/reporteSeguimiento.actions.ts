import { createAction, props } from '@ngrx/store';
import { SeguimientoCelulaResponse } from '../../../modelos/reportes/celulas/response/seguimientoCelulaResponse';
export const crearReporteSeguimientoCelula = createAction('[ReporteSeguimientoCelula] Crea reporteSeguimientoCelula', props<SeguimientoCelulaResponse>());
export const limpiarReporteSeguimientoCelula = createAction('[ReporteSeguimientoCelula] Limpiar reporteSeguimientoCelula');