import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReporteLiderResponse } from '../../../../../modelos/reportes/celulas/response/reporteLiderResponse';
import { SeguimientoCelulaService } from '../../../../../servicios/reportes/celulas/seguimiento-celula.service';
import { Respuesta } from '../../../../../modelos/respuesta/respuesta';
import { UsuariorResponse } from '../../../../../modelos/login/response/usuarioResponse';

@Component({
  selector: 'app-table-reporte-lider',
  templateUrl: './table-reporte-lider.component.html',
  styleUrls: ['./table-reporte-lider.component.css'],
})
export class TableReporteLiderComponent implements OnInit {
  constructor(private _seguimientoCelulaService: SeguimientoCelulaService) {
    this.reporteLidres();
  }

  ngOnInit(): void {}

  //#region logica
  obtenerUsuarioLogin(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }
  buscar(termino: string) {
    var listaNueva: ReporteLiderResponse[] = [];
    if (termino.length) {
      

      this.datosReportes.slice().forEach((elemento)=> {
          if (elemento.name.toLowerCase().indexOf(termino.toLowerCase()) != -1) {
            listaNueva.push(elemento);
          }
        });
        this.dataSource.data = listaNueva;
    } else if (termino == undefined || termino == null || termino == '') {
      
      
        this.dataSource.data = this.datosReportes;
      
    }
  }

  limpiarFiltro(){
    this.reporteLidres();
  }
  //#endregion

  //#region  Servicios rest
  reporteLidres() {
    this._seguimientoCelulaService
      .ReporteLiderCelula({ idAccess: this.obtenerUsuarioLogin().idUser, red: this.obtenerUsuarioLogin().liderCode })
      .subscribe((resp: Respuesta<ReporteLiderResponse>) => {
        this.datosReportes = resp.entity
         this.dataSource.data = resp.entity;
         this.dataSource.paginator = this.paginator;
        
      });
  }
  //#endregion

  //#region variables
  displayedColumns: string[] = [
    // 'code',
    'name',
    'total',
    'active',
    'inactive',
    
  ];

  datosReportes: ReporteLiderResponse[];
  dataSource = new MatTableDataSource<ReporteLiderResponse>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //#endregion
}


