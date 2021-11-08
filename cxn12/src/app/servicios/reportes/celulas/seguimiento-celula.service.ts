import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReporteCelulas } from '../../../transversal/servicioRest/nombreRutas/reportes/celulas/reporteCelulas';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../modelos/respuesta/respuesta';

import { environment } from '../../../../environments/environment';
import { header } from '../../../transversal/servicioRest/configuracion/header';
import { SeguimientoCelulaRequest } from '../../../modelos/reportes/celulas/request/seguimientoCelulaRequest';
import { ReporteLiderRequest } from '../../../modelos/reportes/celulas/request/reporteLiderRequest';
import { EstadoCelulaRequest } from '../../../modelos/reportes/celulas/request/estadoCelulaRequest';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoCelulaService {
  constructor(
    private http: HttpClient,
    public _rutasReporteCelulas: ReporteCelulas
  ) {}

  ReporteSeguimientoCelula<SeguimientoCelulaResponse>(
    modelo: SeguimientoCelulaRequest
  ): Observable<Respuesta<SeguimientoCelulaResponse>> {
    return this.http.post<Respuesta<SeguimientoCelulaResponse>>(
      `${environment.urlLocalServicioRest}${this._rutasReporteCelulas.ConsultarSeguimientoCelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }


  ReporteLiderCelula<ReporteLiderResponse>(
    modelo: ReporteLiderRequest
  ): Observable<Respuesta<ReporteLiderResponse>> {
    return this.http.post<Respuesta<ReporteLiderResponse>>(
      `${environment.urlLocalServicioRest}${this._rutasReporteCelulas.ConsultarEstadoLider}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }


  ReportEstadoCelula<EstadoCelulaResponse>(
    modelo: EstadoCelulaRequest
  ): Observable<Respuesta<EstadoCelulaResponse>> {
    return this.http.post<Respuesta<EstadoCelulaResponse>>(
      `${environment.urlLocalServicioRest}${this._rutasReporteCelulas.ConsultarEstadoCelula}`,
      JSON.stringify(modelo),
      { headers: header }
    );
  }
}
