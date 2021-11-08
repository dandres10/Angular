import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LiderService } from '../../../../../servicios/lider/lider.service';
import { Respuesta } from '../../../../../modelos/respuesta/respuesta';
import { ListaLideresResponse } from '../../../../../modelos/lider/response/listaLideresResponse';
import { UsuariorResponse } from '../../../../../modelos/login/response/usuarioResponse';
import { EstadoCelulaResponse } from '../../../../../modelos/reportes/celulas/response/estadoCelulaResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';

@Component({
  selector: 'app-table-reporte-estado-celula',
  templateUrl: './table-reporte-estado-celula.component.html',
  styleUrls: ['./table-reporte-estado-celula.component.css'],
})
export class TableReporteEstadoCelulaComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.suscribirReporteEstadoCelulaRedux();
  }

  ngOnInit(): void {}

  suscribirReporteEstadoCelulaRedux() {
    this.store.select('reporteCelulaReducer').subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
    });
  }

  

  //#region variables
  displayedColumns: string[] = [
    'hostName',
    'leaderName',
    'cellType',
    'state',
    'closingReasons',
  ];

  dataSource = new MatTableDataSource<EstadoCelulaResponse>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  //#endregion
}


