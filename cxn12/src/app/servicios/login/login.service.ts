import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRutas } from '../../transversal/servicioRest/nombreRutas/login/login';
import { ServiciosRest } from '../../transversal/interfaces/serviciosRest';
import { Observable } from 'rxjs';

import { UsuarioRequest } from '../../modelos/login/request/usuarioRequest';

import { header } from '../../transversal/servicioRest/configuracion/header';
import { environment } from '../../../environments/environment';
import { UsuariorResponse } from '../../modelos/login/response/usuarioResponse';
import { Respuesta } from '../../modelos/respuesta/respuesta';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements ServiciosRest {
  constructor(private http: HttpClient, public _loginRutas: LoginRutas) {}
  GuardarEntidad<T>(modelo: any): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }
  EditarEntidad<T>(modelo: any): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }
  ConsultarEntidadLista<T>(): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }
  EliminarEntidad<T>(modelo: any): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }

  ConsultarEntidad<UsuariorResponse>(
    modelo: UsuarioRequest
  ): Observable<Respuesta<UsuariorResponse>> {
    return this.http.post<Respuesta<UsuariorResponse>>(
      `${environment.urlLocalServicioRest}${this._loginRutas.ConsultarLogin}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
  ConsultarEntidadListaModelo<T>(modelo: any): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }
}
