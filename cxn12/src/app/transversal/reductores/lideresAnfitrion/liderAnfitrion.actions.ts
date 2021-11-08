import { createAction, props } from '@ngrx/store';
import { ListaLiderAnfitrionResponse } from '../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';

export const crearLiderAnfitrion = createAction('[LiderAnfitrion] Crea liderAnfitrion', props<ListaLiderAnfitrionResponse>());
export const editarLiderAnfitrion = createAction('[LiderAnfitrion] Editar liderAnfitrion', props<ListaLiderAnfitrionResponse>());
export const limpiarLiderAnfitrion = createAction('[LiderAnfitrion] Limpiar liderAnfitrion');