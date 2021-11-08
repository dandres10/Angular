import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditarComponent } from '../../../dialogs/liderCelula/editar/editar.component';
import { VerComponent } from '../../../dialogs/liderCelula/ver/ver.component';
import { AgregaCelulaComponent } from '../../../dialogs/celulaNueva/agrega-celula/agrega-celula.component';
import { LiderAnfitrionService } from '../../../../servicios/liderAnfitrion/lider-anfitrion.service';
import { ListaLiderAnfitrionResponse } from '../../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';
import { ListaLiderAnfitrionRequest } from '../../../../modelos/liderAnfitrion/request/listaLiderAnfitrionRequest';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { AppState } from '../../../../app.reducer';
import { Store } from '@ngrx/store';
import {
  crearLiderAnfitrion,
  limpiarLiderAnfitrion,
} from '../../../../transversal/reductores/lideresAnfitrion/liderAnfitrion.actions';
import { CelulaService } from '../../../../servicios/celula/celula.service';
import { GuardarCelulaRequest } from '../../../../modelos/celula/request/guardarCelulaRequest';
import {
  crearCelula,
  limpiarCelula,
} from '../../../../paginas/celula/reductor/celula.actions';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import { ListaCelulasRequest } from '../../../../modelos/celula/request/listaCelulasRequest';
import { Meses } from '../../../../transversal/modelos/mesesAno';
import { EditarLiderAnfitrionRequest } from '../../../../modelos/liderAnfitrion/request/editarLiderAnfitrionRequest';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';
import { RespuestaComponent } from '../../../dialogs/respuestas/respuesta/respuesta.component';
import { RespuestaSinEntity } from '../../../../modelos/respuesta/respuestaSinEntity';

@Component({
  selector: 'app-table-lideres-celula',
  templateUrl: './table-lideres-celula.component.html',
  styleUrls: ['./table-lideres-celula.component.css'],
})
export class TableLideresCelulaComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _liderAnfitrionService: LiderAnfitrionService,
    private store: Store<AppState>,
    private _celulaService: CelulaService
  ) {}

  ngOnInit(): void {
    
    this.suscribirLideresAnfitrionRedux();
    this.mesActual();
  }

  //#region logica

  limpiarFiltro(){
    
    this.store
      .select('lideresAnfitrion')
      .subscribe((lideres: ListaLiderAnfitrionResponse[]) => {
        this.dataSource.data = lideres;
      });
  }
  ordenarAZLider12(){
    this.store
      .select('lideresAnfitrion')
      .subscribe((lideres: ListaLiderAnfitrionResponse[]) => {
        this.dataSource.data = lideres.slice().sort((a, b) => {
          if (a.documentNumber != null && b.documentNumber!= null && a.documentNumber != undefined && b.documentNumber!= undefined) {
            
            const dato1 =  `${a.name} ${a.lastName} ${a.lastNameSecond}`.toLowerCase();
            const dato2 = `${b.name} ${b.lastName} ${b.lastNameSecond}`.toLowerCase();
  
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

  buscar(termino: string) {
    var listaNueva: ListaLiderAnfitrionResponse[] = [];
    if (termino.length) {
      this.store
        .select('lideresAnfitrion')
        .subscribe((lideresAnfitrion: ListaLiderAnfitrionResponse[]) => {
          lideresAnfitrion.slice().forEach((element) => {
            if (
              element.documentNumber.toLowerCase().indexOf(termino.toLowerCase()) !=
                -1 ||
              element.name.toLowerCase().indexOf(termino.toLowerCase()) != -1
              ||
              element.phone.toLowerCase().indexOf(termino.toLowerCase()) != -1
              ||
              element.movil.toLowerCase().indexOf(termino.toLowerCase()) != -1
              ||
              element.email.toLowerCase().indexOf(termino.toLowerCase()) != -1
              ||
              element.lastName.toLowerCase().indexOf(termino.toLowerCase()) != -1
              ||
              element.lastNameSecond.toLowerCase().indexOf(termino.toLowerCase()) != -1
              ||
              element.address.toLowerCase().indexOf(termino.toLowerCase()) != -1
              ||
              `${element.name} ${element.lastName} ${element.lastNameSecond}`.toLowerCase().indexOf(termino.toLowerCase()) != -1
            ) {
              listaNueva.push(element);
            }
          });
        });

        this.dataSource.data = listaNueva;
    } else if (termino == undefined || termino == null || termino == '') {
      
      this.store
      .select('lideresAnfitrion')
      .subscribe((lider: ListaLiderAnfitrionResponse[]) => {
        this.dataSource.data = lider;
      });
    }
  }
  obtenerUsuarioSessionStorange(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }

  suscribirLideresAnfitrionRedux() {
    this.store
      .select('lideresAnfitrion')
      .subscribe((lideresAnfitrion: ListaLiderAnfitrionResponse[]) => {
        this.listaLiderAnfitrionRespuesta = lideresAnfitrion;
        this.dataSource.data = this.listaLiderAnfitrionRespuesta;
        this.dataSource.paginator = this.paginator;
      });
  }

  cargarLiderAnfitrionRedux(celulas: ListaLiderAnfitrionResponse[]) {
    celulas.forEach((element: ListaLiderAnfitrionResponse) => {
      this.store.dispatch(crearLiderAnfitrion(element));
    });
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

  cargarCelulasRedux(celulas: ListaCelulasResponse[]) {
    celulas.forEach((element: ListaCelulasResponse) => {
      this.store.dispatch(crearCelula(element));
    });
  }
  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, { data: datos });
  }
  //#endregion
  //#region serviciosREST

  listarLideresAnfitriones() {
    let posicion: number = 1;
    this._liderAnfitrionService
      .ConsultarEntidadListaModelo({
        idUser: this.obtenerUsuarioSessionStorange().idUser,
      })
      .subscribe((resp: Respuesta<ListaLiderAnfitrionResponse>) => {
        this.listaLiderRespuesta = resp;
        this.listaLiderAnfitrionRespuesta = this.listaLiderRespuesta.entity;
        this.listaLiderAnfitrionRespuesta.map((dato) => {
          dato.posicion = posicion++;
        });

        this.cargarLiderAnfitrionRedux(this.listaLiderAnfitrionRespuesta.reverse());
       
      });
  }

  editarLiderAnfitrion(datos: EditarLiderAnfitrionRequest) {
    this._liderAnfitrionService.EditarEntidad(datos).subscribe(
      () => {
        this.store.dispatch(limpiarLiderAnfitrion());
        this.listarLideresAnfitriones();
      },
      () => {
        console.log('no se encontro el id');
      }
    );
  }

  listarCelulas() {
    let listaCelulasRequest: ListaCelulasRequest = {
      idUser: this.obtenerUsuarioSessionStorange().idUser,
    };
    let posicionesArray = 1;
    this._celulaService
      .ConsultarEntidadListaModelo(listaCelulasRequest)
      .subscribe(
        (resp: Respuesta<ListaCelulasResponse>) => {
          this.listaCelulasResponse = resp.entity;
          this.listaCelulasResponse.map((dato) => {
            dato.posicion = posicionesArray++;
            dato.reporteSemana = 'Reportar';

            return dato;
          });
          this.store.dispatch(limpiarCelula());
          this.cargarCelulasRedux(this.listaCelulasResponse);
        },
        () => {
          console.log('Error en la consulta del servicio!!!');
        }
      );
  }

  agregarCelula(dato: GuardarCelulaRequest) {
    this._celulaService.GuardarEntidad(dato).subscribe(
      (resp: RespuestaSinEntity) => {
        if (resp.result == true) {
          this.dialogInformativo({
            mensaje: resp.message[0],
            tipoNotificacion: resp.notificationType,
          });
          this.listarCelulas();
        } else {
          this.dialogInformativo({
            mensaje: resp.message[0],
            tipoNotificacion: resp.notificationType,
          });
        }
      },
      () => {
        this.dialogInformativo({
          mensaje: 'Error en la consulta del servicio.',
          tipoNotificacion: 2,
        });
      }
    );
  }
  //#endregion

  //#region dialogs
  openDialogEditar(liderAnfitrion: ListaLiderAnfitrionResponse) {
    const dialogRef = this.dialog.open(EditarComponent, {
      data: liderAnfitrion,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.editarLiderAnfitrion(JSON.parse(result));
    });
  }
  openDialogAgregarCelula(liderAnfitrion: ListaLiderAnfitrionResponse) {
    const dialogRef = this.dialog.open(AgregaCelulaComponent, {
      data: liderAnfitrion,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(JSON.parse(result));
      this.agregarCelula(JSON.parse(result));
    });
  }
  openDialogVer(liderAnfitrion: ListaLiderAnfitrionResponse) {
    console.log(liderAnfitrion) ;
    const dialogRef = this.dialog.open(VerComponent, { data: liderAnfitrion });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(JSON.parse(result) );
    });
  }
  //#endregion

  //#region Variables
  displayedColumns: string[] = [
    
    'documentNumber',
    'name',
    'phone',
    'movil',
    'acciones',
  ];

  dataSource = new MatTableDataSource<ListaLiderAnfitrionResponse>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  listaLiderAnfitrionRequest: ListaLiderAnfitrionRequest;
  listaLiderRespuesta: Respuesta<ListaLiderAnfitrionResponse>;
  listaLiderAnfitrionRespuesta: ListaLiderAnfitrionResponse[];
  guardarCelulaRequest: GuardarCelulaRequest;
  listaCelulasResponse: ListaCelulasResponse[] = [];
  mesActualNombre: string;
  //#endregion
}
