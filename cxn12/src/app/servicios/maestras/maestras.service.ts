import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListaTypoDocumentoRequest } from '../../modelos/maestras/request/listaTypoDocumentoRequest';
import { Observable } from 'rxjs';
import { Respuesta } from '../../modelos/respuesta/respuesta';
import { environment } from '../../../environments/environment';
import { header } from '../../transversal/servicioRest/configuracion/header';
import { MaestrasRutas } from '../../transversal/servicioRest/nombreRutas/maestras/maestras';
import { ListaTipoPersonaRequest } from '../../modelos/maestras/request/listaTipoPersonaRequest';

@Injectable({
  providedIn: 'root'
})
export class MaestrasService  {

  constructor(private http: HttpClient, public _maestrasRutas:MaestrasRutas) { }


  ConsultarEntidad<listaTypoDocumentoResponse>(
    modelo: ListaTypoDocumentoRequest
  ): Observable<Respuesta<listaTypoDocumentoResponse>> {
    return this.http.post<Respuesta<listaTypoDocumentoResponse>>(
      `${environment.urlLocalServicioRest}${this._maestrasRutas.ConsultarTiposDocumentos}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }

  ConsultarEntidadListaTipoPersona<ListaTipoPersonaResponse>(
    modelo: ListaTipoPersonaRequest
  ): Observable<Respuesta<ListaTipoPersonaResponse>> {
    return this.http.post<Respuesta<ListaTipoPersonaResponse>>(
      `${environment.urlLocalServicioRest}${this._maestrasRutas.ConsultarTiposPersonas}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }

  ConsultarEntidadListaTipoCelulas<ListaTipoCelulasResponse>(): Observable<Respuesta<ListaTipoCelulasResponse>> {
    return this.http.post<Respuesta<ListaTipoCelulasResponse>>(
      `${environment.urlLocalServicioRest}${this._maestrasRutas.ConsultarTiposCelulas}`,
      JSON.stringify({}),
      { headers: header }
    );
  }
}
