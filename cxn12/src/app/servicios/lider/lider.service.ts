import { Injectable } from '@angular/core';
import { ServiciosRest } from '../../transversal/interfaces/serviciosRest';
import { Observable } from 'rxjs';
import { Respuesta } from '../../modelos/respuesta/respuesta';
import { ListaLideresRequest } from '../../modelos/lider/request/listaLideresRequest';

import { HttpClient } from '@angular/common/http';
import { LiderRutas } from '../../transversal/servicioRest/nombreRutas/lider/lider';
import { environment } from '../../../environments/environment';
import { header } from '../../transversal/servicioRest/configuracion/header';

@Injectable({
  providedIn: 'root',
})
export class LiderService implements ServiciosRest {
  constructor(private http: HttpClient, public _rutasLider: LiderRutas) {}
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
  ConsultarEntidad<T>(modelo: any): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }
  ConsultarEntidadListaModelo<ListaLideresResponse>(
    modelo: ListaLideresRequest
  ): Observable<Respuesta<ListaLideresResponse>> {
    return this.http.post<Respuesta<ListaLideresResponse>>(
      `${environment.urlLocalServicioRest}${this._rutasLider.ConsultarListaCelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
}
