import { createAction, props } from '@ngrx/store';
import { UsuariorResponse } from '../../../modelos/login/response/usuarioResponse';

export const crearLogin = createAction('[Login] Crea login', props<UsuariorResponse>());
export const editarLogin = createAction('[Login] Editar login', props<UsuariorResponse>());
export const limpiarLogin = createAction('[Login] Limpiar login');