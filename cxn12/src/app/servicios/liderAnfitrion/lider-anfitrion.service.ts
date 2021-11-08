import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiderAnfitrionRutas } from '../../transversal/servicioRest/nombreRutas/liderAnfitrion/liderAnfitrion';
import { ServiciosRest } from '../../transversal/interfaces/serviciosRest';
import { Observable } from 'rxjs';
import { Respuesta } from '../../modelos/respuesta/respuesta';
import { ListaLiderAnfitrionRequest } from '../../modelos/liderAnfitrion/request/listaLiderAnfitrionRequest';
import { environment } from '../../../environments/environment';
import { header } from '../../transversal/servicioRest/configuracion/header';
import { EditarLiderAnfitrionRequest } from '../../modelos/liderAnfitrion/request/editarLiderAnfitrionRequest';
import { ConsultarLiderAnfitrionRequest } from '../../modelos/liderAnfitrion/request/consultarLiderAnfitrionRequest';
import { RespuestaSinEntity } from '../../modelos/respuesta/respuestaSinEntity';
import { CrearLiderAnfitrionRequest } from '../../modelos/liderAnfitrion/request/crearLiderAnfitrionRequest';

@Injectable({
  providedIn: 'root',
})
export class LiderAnfitrionService implements ServiciosRest {
  constructor(
    private http: HttpClient,
    public _liderAnfitrionRutas: LiderAnfitrionRutas
  ) {}

  GuardarEntidad<RespuestaSinEntity>(
    modelo: CrearLiderAnfitrionRequest
  ): Observable<Respuesta<RespuestaSinEntity>> {
    return this.http.post<Respuesta<RespuestaSinEntity>>(
      `${environment.urlLocalServicioRest}${this._liderAnfitrionRutas.CrearLiderAnfitrion}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }

  EditarEntidad<RespuestaSinEntity>(
    modelo: EditarLiderAnfitrionRequest
  ): Observable<RespuestaSinEntity> {
    return this.http.put<RespuestaSinEntity>(
      `${environment.urlLocalServicioRest}${this._liderAnfitrionRutas.EditarLiderAnfitrion}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
  ConsultarEntidadLista<T>(): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }
  EliminarEntidad<T>(modelo: any): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }

  ConsultarEntidad<consultarLiderAnfitrionResponse>(
    modelo: ConsultarLiderAnfitrionRequest
  ): Observable<Respuesta<consultarLiderAnfitrionResponse>> {
    return this.http.post<Respuesta<consultarLiderAnfitrionResponse>>(
      `${environment.urlLocalServicioRest}${this._liderAnfitrionRutas.ConsultarLiderAnfitrion}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
  ConsultarEntidadListaModelo<ListaLiderAnfitrionResponse>(
    modelo: ListaLiderAnfitrionRequest
  ): Observable<Respuesta<ListaLiderAnfitrionResponse>> {
    return this.http.post<Respuesta<ListaLiderAnfitrionResponse>>(
      `${environment.urlLocalServicioRest}${this._liderAnfitrionRutas.ConsultarListaLiderAnfitrion}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
}
