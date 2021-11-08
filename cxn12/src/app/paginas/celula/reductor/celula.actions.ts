import { createAction, props } from '@ngrx/store';
import { ListaCelulasResponse } from '../../../modelos/celula/response/listaCelulasResponse';

export const crearCelula = createAction('[Celula] Crea celula', props<ListaCelulasResponse>());
export const editarCelula = createAction('[Celula] Editar celula', props<ListaCelulasResponse>());
export const limpiarCelula = createAction('[Celula] Limpiar celula');
export const filtroEstado = createAction('[Celula] FiltroEstado celula', props<{estado: boolean}>());





