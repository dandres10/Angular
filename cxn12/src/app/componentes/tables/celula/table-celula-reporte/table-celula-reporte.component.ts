import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CelulaReporte } from '../../../../modelos/celula/celulaReporte';
import { MatTableDataSource } from '@angular/material/table';
import { CelulaService } from '../../../../servicios/celula/celula.service';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import { ServiciosRest } from '../../../../transversal/interfaces/serviciosRest';
import { Respuesta } from 'src/app/modelos/respuesta/respuesta';
import { ReporteCelulaResponse } from '../../../../modelos/celula/response/reporteCelulaResponse';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaComponent } from '../../../dialogs/respuestas/respuesta/respuesta.component';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';

@Component({
  selector: 'app-table-celula-reporte',
  templateUrl: './table-celula-reporte.component.html',
  styleUrls: ['./table-celula-reporte.component.css'],
})
export class TableCelulaReporteComponent implements OnInit {
  constructor(private _CelulaService: CelulaService,public dialog: MatDialog) {}

  ngOnInit(): void {
   
      this.listarReporteCelula();
  
   
  }

  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, {data : datos});
    
  }

  //#region  ServiciosRest
  listarReporteCelula() {
    
    
    let posision = 1;
    this._CelulaService
      .ListaReporteCelula({ idGo: this.celula.id })
      .subscribe((resp: Respuesta<ReporteCelulaResponse>) => {
         
        if (resp.result == true) {
          this.listarReporteCelulaRespuesta = resp.entity;
        this.listarReporteCelulaRespuesta.map((elemento: ReporteCelulaResponse) => {
          elemento.posicion = posision++;
        });
       
        this.dataSource.data = this.listarReporteCelulaRespuesta;
        this.dataSource.paginator = this.paginator;
        }else{
          this.dialogInformativo({mensaje: resp.message[0],tipoNotificacion :2 });
        }

        
      },() => {
        this.dialogInformativo({mensaje: "No existen registros.",tipoNotificacion :2 });
      });
  }
  //#endregion

  //#region Variables
  displayedColumns: string[] = [
    'posicion',
    'topic',
    'year',
    'month',
    'week',
    
    'done',
    'numberAttendess',
    // 'donaciones'
  ];
  dataSource = new MatTableDataSource<ReporteCelulaResponse>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() celula: ListaCelulasResponse;
  listarReporteCelulaRespuesta: ReporteCelulaResponse[] = [];
  //#endregion
}

