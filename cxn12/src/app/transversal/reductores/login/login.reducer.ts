import { UsuariorResponse } from '../../../modelos/login/response/usuarioResponse';
import { createReducer, on } from '@ngrx/store';
import { crearLogin, editarLogin, limpiarLogin } from './login.actions';
export const estadoIncial: UsuariorResponse[] = [];

const _loginReducer = createReducer(
  estadoIncial,
  on(crearLogin, (state, UsuariorResponse) => [
    ...state,
    UsuariorResponse,
  ]),

  on(editarLogin, (state,UsuariorResponse) => {
   
    return state.map( usuario => {

      if ( usuario.idUser === UsuariorResponse.idUser  ) {
        
        return {
          ...usuario = 
           UsuariorResponse
        }
        
      } else {
        return usuario;
      }

    });
  }),

  on(limpiarLogin, state => estadoIncial)
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}