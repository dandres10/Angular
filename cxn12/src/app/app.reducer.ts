import { ListaCelulasResponse } from './modelos/celula/response/listaCelulasResponse';
import { ListaLideresResponse } from './modelos/lider/response/listaLideresResponse';
import { ActionReducerMap } from '@ngrx/store';
import { celulaReducer } from './paginas/celula/reductor/celula.reducer';
import { liderReducer } from './transversal/reductores/lideres/lider.reducer';

import { loginReducer } from './transversal/reductores/login/login.reducer';
import { UsuariorResponse } from './modelos/login/response/usuarioResponse';
import { ListaLiderAnfitrionResponse } from './modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';
import { liderAnfitrionReducer } from './transversal/reductores/lideresAnfitrion/liderAnfitrion.reducer';
import { EstadoCelulaResponse } from './modelos/reportes/celulas/response/estadoCelulaResponse';
import { reporteCelulaReducer } from './paginas/reportes/reductor/reporteCelula.reducer';
import { SeguimientoCelulaResponse } from './modelos/reportes/celulas/response/seguimientoCelulaResponse';
import { reporteSeguimientoCelulaReducer } from './paginas/reportes/reductor/reporteSeguimiento.reducer';
import { estadoCargadorReducer } from './transversal/reductores/master/master.actions';

export interface AppState {
  celulas: ListaCelulasResponse[];
  lideres: ListaLideresResponse[];
  login: UsuariorResponse[];
  lideresAnfitrion: ListaLiderAnfitrionResponse[];
  reporteCelulaReducer: EstadoCelulaResponse[];
  reporteSeguimientoCelula: SeguimientoCelulaResponse[];
  estadoCargador: boolean;
}

export const appReducers: ActionReducerMap<AppState> = {
  celulas: celulaReducer,
  lideres: liderReducer,
  login: loginReducer,
  lideresAnfitrion: liderAnfitrionReducer,
  reporteCelulaReducer: reporteCelulaReducer,
  reporteSeguimientoCelula: reporteSeguimientoCelulaReducer,
  estadoCargador: estadoCargadorReducer
};
