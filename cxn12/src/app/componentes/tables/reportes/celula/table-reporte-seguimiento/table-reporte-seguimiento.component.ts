import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { UsuariorResponse } from '../../../../../modelos/login/response/usuarioResponse';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SeguimientoCelulaResponse } from '../../../../../modelos/reportes/celulas/response/seguimientoCelulaResponse';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';
@Component({
  selector: 'app-table-reporte-seguimiento',
  templateUrl: './table-reporte-seguimiento.component.html',
  styleUrls: ['./table-reporte-seguimiento.component.css'],
})
export class TableReporteSeguimientoComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.suscribirReporteSeguimientoCelulaRedux();
  }

  ngOnInit(): void {}

  //#region logica
  obtenerUsuarioLogin(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }

  suscribirReporteSeguimientoCelulaRedux() {
    this.store.select('reporteSeguimientoCelula').subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
    });
  }

  //#endregion

  //#region  Servicios rest
  
  //#endregion

  //#region variables
  displayedColumns: string[] = [
    'hostName',
    'leaderName',
    'cellType',
    'state',
    'done',
    'weekMonth',
  ];

  dataSource = new MatTableDataSource<SeguimientoCelulaResponse>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  //#endregion
}
