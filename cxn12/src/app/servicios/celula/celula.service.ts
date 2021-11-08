import { Injectable } from '@angular/core';
import { ServiciosRest } from '../../transversal/interfaces/serviciosRest';
import { Observable } from 'rxjs';
import { Respuesta } from '../../modelos/respuesta/respuesta';
import { HttpClient } from '@angular/common/http';
import { CelulaRutas } from '../../transversal/servicioRest/nombreRutas/celula/celula';

import { header } from '../../transversal/servicioRest/configuracion/header';
import { ListaCelulasRequest } from 'src/app/modelos/celula/request/listaCelulasRequest';
import { environment } from 'src/environments/environment';
import { EditarCelulaRequest } from '../../modelos/celula/request/editarCelulaRequest';
import { GuardarCelulaRequest } from '../../modelos/celula/request/guardarCelulaRequest';

import { ListaAsistentesCelulaRequest } from '../../modelos/celula/request/listaAsistentesCelulaRequest';

import { GuardarAsistenteCelulaRequest } from '../../modelos/celula/request/guardarAsistenteCelulaRequest';
import { EnviarReporteAsistenciaRequest } from '../../modelos/celula/request/enviarReporteAsistenciaRequest';

import { ReporteCelulaRequest } from '../../modelos/celula/request/reporteCelulaRequest';
import { EliminarCelulaRequest } from '../../modelos/celula/request/eliminarCelulaRequest';

@Injectable({
  providedIn: 'root',
})
export class CelulaService implements ServiciosRest {
  constructor(private http: HttpClient, public _rutasCelula: CelulaRutas) {}

  GuardarEntidad<RespuestaSinEntity>(
    modelo: GuardarCelulaRequest
  ): Observable<RespuestaSinEntity> {
    return this.http.post<RespuestaSinEntity>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.Guardarcelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
  //
  GuardarEntidadAsistenteCelula<RespuestaSinEntity>(
    modelo: GuardarAsistenteCelulaRequest
  ): Observable<RespuestaSinEntity> {
    return this.http.post<RespuestaSinEntity>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.guardarAsistente}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }

  ListaReporteCelula<ReporteCelulaResponse>(
    modelo: ReporteCelulaRequest
  ): Observable<Respuesta<ReporteCelulaResponse>> {
    return this.http.post<Respuesta<ReporteCelulaResponse>>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.reporteListaCelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }

  GuardarEntidadReporteCelula<RespuestaSinEntity>(
    modelo: EnviarReporteAsistenciaRequest
  ): Observable<RespuestaSinEntity> {
    return this.http.post<RespuestaSinEntity>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.reporteAsistenteCelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }

  EditarEntidad<RespuestaSinEntity>(
    modelo: EditarCelulaRequest
  ): Observable<RespuestaSinEntity> {
    return this.http.put<RespuestaSinEntity>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.EditarCelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
  ConsultarEntidadLista<T>(): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }

  ConsultarEntidadListaAsistentes<ListaAsistentesCelulaResponse>(
    modelo: ListaAsistentesCelulaRequest
  ): Observable<Respuesta<ListaAsistentesCelulaResponse>> {
    return this.http.post<Respuesta<ListaAsistentesCelulaResponse>>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.listaAsistentes}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }

  EliminarEntidad<RespuestaSinEntity>(
    modelo: EliminarCelulaRequest
  ): Observable<Respuesta<RespuestaSinEntity>> {
    return this.http.put<Respuesta<RespuestaSinEntity>>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.EliminarCelulaCerrarla}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
  ConsultarEntidad<T>(modelo: any): Observable<Respuesta<T>> {
    throw new Error('Method not implemented.');
  }

  ConsultarEntidadListaModelo<listaCelulasResponse>(
    modelo: ListaCelulasRequest
  ): Observable<Respuesta<listaCelulasResponse>> {
    return this.http.post<Respuesta<listaCelulasResponse>>(
      `${environment.urlLocalServicioRest}${this._rutasCelula.ConsultarListaCelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
}
