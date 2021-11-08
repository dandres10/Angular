//#region  imports
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { ReporteSemanaPruebaComponent } from '../../../dialogs/celula/reporte-semana-prueba/reporte-semana-prueba.component';
import { EditarComponent } from '../../../dialogs/celula/editar/editar.component';
import { VerComponent } from '../../../dialogs/celula/ver/ver.component';
import { ReporteComponent } from '../../../dialogs/celula/reporte/reporte.component';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';

import { CelulaService } from '../../../../servicios/celula/celula.service';
import { EditarCelulaRequest } from '../../../../modelos/celula/request/editarCelulaRequest';
import { RespuestaSinEntity } from '../../../../modelos/respuesta/respuestaSinEntity';
import { Time } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ListaCelulasRequest } from '../../../../modelos/celula/request/listaCelulasRequest';

import { limpiarCelula, crearCelula } from '../../../../paginas/celula/reductor/celula.actions';
import { Meses } from '../../../../transversal/modelos/mesesAno';
import {
  editarCelula,
  filtroEstado,
} from '../../../../paginas/celula/reductor/celula.actions';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';
import { RespuestaComponent } from '../../../dialogs/respuestas/respuesta/respuesta.component';
import { CerrarComponent } from '../../../dialogs/celula/cerrar/cerrar.component';
import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
//#endregion

@Component({
  selector: 'app-tablecelula1',
  templateUrl: './tablecelula1.component.html',
  styleUrls: ['./tablecelula1.component.css'],
})
export class Tablecelula1Component implements OnInit {
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private _celulaService: CelulaService,

    private fb: FormBuilder
  ) {
    this.mesActual();
    this.suscribirCelulasRedux();
  }

  ngOnInit() {
    this.obtenerCelulasRedux();
  }

  //#region logica

  buscar(termino: string) {
    var listaNueva: ListaCelulasResponse[] = [];
    if (termino.length) {
      this.store
        .select('celulas')
        .subscribe((celulas: ListaCelulasResponse[]) => {
          celulas.slice().forEach((element) => {
            if (
              element.leader.toLowerCase().indexOf(termino.toLowerCase()) !=
                -1 ||
              element.host.toLowerCase().indexOf(termino.toLowerCase()) != -1
            ) {
              listaNueva.push(element);
            }
          });
        });

        this.dataSource.data = listaNueva;
    } else if (termino == undefined || termino == null || termino == '') {
      
      this.store
      .select('celulas')
      .subscribe((celulas: ListaCelulasResponse[]) => {
        this.dataSource.data = celulas;
      });
    }
  }

  filtrarEstado(data: boolean) {
    this.store
      .select('celulas')
      .subscribe((celulas: ListaCelulasResponse[]) => {
        this.dataSource.data = celulas.filter(
          (cedula) => cedula.status == data
        );
      });
  }
  limpiarFiltro(){
    this.listarCelulas();
    this.store
      .select('celulas')
      .subscribe((celulas: ListaCelulasResponse[]) => {
        this.dataSource.data = celulas;
      });
  }

  ordenarAZLiderGo() {
    this.store
      .select('celulas')
      .subscribe((celulas: ListaCelulasResponse[]) => {
        this.dataSource.data = celulas.slice().sort((a, b) => {
          if (a.leader != null && b.leader!= null && a.leader != undefined && b.leader!= undefined) {
            
            const dato1 = a.leader.toLowerCase();
            const dato2 = b.leader.toLowerCase();
  
            if (dato1 < dato2) {
              return -1;
            }
            if (dato1 < dato2) {
              return 1;
            }
            return 0;
          }
        });
      });
  }

  ordenarAZLider12(){
    this.store
      .select('celulas')
      .subscribe((celulas: ListaCelulasResponse[]) => {
        this.dataSource.data = celulas.slice().sort((a, b) => {
          if (a.host != null && b.host!= null && a.host != undefined && b.host!= undefined) {
            
            const dato1 = a.host.toLowerCase();
            const dato2 = b.host.toLowerCase();
  
            if (dato1 < dato2) {
              return -1;
            }
            if (dato1 < dato2) {
              return 1;
            }
            return 0;
          }
        });
      });
  }

  limpiarCelulasRedux() {
    this.store.dispatch(limpiarCelula());
  }

  mesActual() {
    let mes = new Date().getMonth() + 1;

    Meses.forEach((element) => {
      if (element.key == mes) {
        this.mesActualNombre = element.mes;
      }
    });

    return new Date().getMonth();
  }

  obtenerCelulasRedux() {
    this.store
      .select('celulas')
      .subscribe((celulas: ListaCelulasResponse[]) => {
        this.dataSource.data = celulas;
        this.dataSource.paginator = this.paginator;
      });
  }

  

  suscribirCelulasRedux() {
    this.store
      .select('celulas')
      .subscribe((celulas) => (this.dataSource.data = celulas));
  }

  obtenerHoraTime(dato: Time) {
    let hora: string[] = [];
    hora = dato.toString().split('T');
    return hora[hora.length - 1];
  }

  mapperRequestCelulaEditar(celulaEditar: ListaCelulasResponse) {
    let editarCelulaRequest: EditarCelulaRequest = {
      idGo: celulaEditar.id,
      day: celulaEditar.day,
      Hour: celulaEditar.hour,
      ModificationUser: 1,
      typeGo: celulaEditar.idType,
    };

    return editarCelulaRequest;
  }
  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, { data: datos });
  }
  obtenerUsuSessionStorange(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }
  cargarCelulasRedux(celulas: ListaCelulasResponse[]) {
    celulas.forEach((element: ListaCelulasResponse) => {
      this.store.dispatch(crearCelula(element));
    });
  }
  //#endregion
  //#region ServiciosRest

  listarCelulas() {
    this.store.dispatch(limpiarCelula());
    let posicionesArray = 1;
    this._celulaService
      .ConsultarEntidadListaModelo({idUser: this.obtenerUsuSessionStorange().idUser})
      .subscribe(
        (resp: Respuesta<ListaCelulasResponse>) => {
          this.listaCelulasRespuesta = resp.entity;
          this.listaCelulasRespuesta.map((dato) => {
            dato.posicion = posicionesArray++;
            dato.reporteSemana = 'Reportar';
          //console.log(this.listaCelulasRespuesta);
            return dato;
          });
          this.cargarCelulasRedux(this.listaCelulasRespuesta);
        },
        () => {
          //this.cambioEstadoCargador();
          console.log('Error en la consulta del servicio!!!');
        }
      );
  }
  
  editarCelula(datos: ListaCelulasResponse) {
    this._celulaService
      .EditarEntidad(this.mapperRequestCelulaEditar(datos))
      .subscribe(
        (resp: RespuestaSinEntity) => {
          if (resp.result == true) {
            this.editarCelulaResponse = resp;
            this.store.dispatch(editarCelula(datos));
            this.dialogInformativo({
              mensaje: resp.message[0],
              tipoNotificacion: resp.notificationType,
            });
          } else {
            this.dialogInformativo({
              mensaje: resp.message[0],
              tipoNotificacion: resp.notificationType,
            });
          }
        },
        () => {
          this.dialogInformativo({
            mensaje: 'Error en el servidor.',
            tipoNotificacion: 3,
          });
        }
      );
  }

  //#endregion
  //#region  Metodos Dialogs
  openDialog() {
    this.dialog.open(ReporteSemanaPruebaComponent);
  }

  openDialogEditar(celulaEditar: ListaCelulasResponse) {
    const dialogRef = this.dialog.open(EditarComponent, {
      data: celulaEditar,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.editarCelula(JSON.parse(result));
    });
  }

  openDialogCerrar(celulaCerrar: ListaCelulasResponse) {
    const dialogRef = this.dialog.open(CerrarComponent, {
      data: celulaCerrar,
    });
  }

  reporteSemanaDialog(celulaReporteSemana: ListaCelulasResponse) {
    const dialogRef = this.dialog.open(ReporteSemanaPruebaComponent, {
      data: celulaReporteSemana,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogVer(celulaVer: ListaCelulasResponse) {
    const dialogRef = this.dialog.open(VerComponent, {
      data: celulaVer,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined || result == null) {
        console.log(`Dialog result: ${result}`);
      }
    });
  }
  openDialogReporte(celulaReporte: ListaCelulasResponse) {
    const dialogRef = this.dialog.open(ReporteComponent, {
      data: celulaReporte,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //#endregion
  //#region variables
  displayedColumns: string[] = [
    'posicion',
    'leader',
    'typeGo',
    'status',
    'host',
    'reporteSemana',
    'acciones',
  ];

  dataSource = new MatTableDataSource<ListaCelulasResponse>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  fecha: Date;
  editarCelulaResponse: RespuestaSinEntity;
  listaCelulasResponse: ListaCelulasResponse;
  listaCelulasRequest: ListaCelulasRequest;
  mesActualNombre: string;
  listaCelulasResponseLista: ListaCelulasResponse[] = [];
  listaCelulasRespuesta: ListaCelulasResponse[]= [];

  //#endregion
}
