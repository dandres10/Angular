import { createAction, props } from '@ngrx/store';
import { EstadoCelulaResponse } from '../../../modelos/reportes/celulas/response/estadoCelulaResponse';
export const crearReporteCelula = createAction('[ReporteCelula] Crea reporteCelula', props<EstadoCelulaResponse>());
export const limpiarReporteCelula = createAction('[ReporteCelula] Limpiar reporteCelula');