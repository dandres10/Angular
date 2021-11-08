import { createAction, props } from '@ngrx/store';
import { ListaLideresResponse } from '../../../modelos/lider/response/listaLideresResponse';


export const crearLider = createAction('[Celula] Crea lider', props<ListaLideresResponse>());
export const editarLider = createAction('[Celula] Editar lider', props<ListaLideresResponse>());
export const limpiarLider = createAction('[Celula] Limpiar lider');