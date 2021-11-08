import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NuevaComponent } from '../../componentes/dialogs/celulaNueva/nueva/nueva.component';
import { CelulaService } from '../../servicios/celula/celula.service';
import { ListaCelulasRequest } from '../../modelos/celula/request/listaCelulasRequest';
import { ListaCelulasResponse } from '../../modelos/celula/response/listaCelulasResponse';
import { Respuesta } from '../../modelos/respuesta/respuesta';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { crearCelula, limpiarCelula } from './reductor/celula.actions';
import { Meses } from '../../transversal/modelos/mesesAno';
import { UsuariorResponse } from '../../modelos/login/response/usuarioResponse';
import { estadoCargador } from '../../transversal/reductores/master/master.reducer';

@Component({
  selector: 'app-celula',
  templateUrl: './celula.component.html',
  styleUrls: ['./celula.component.css'],
})
export class CelulaComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _celulaService: CelulaService,

    private store: Store<AppState>
  ) {
    this.suscribirCelulasRedux();
    this.suscribirLoginRedux();
    this.suscribirEstadoCargadorGlobalRedux();
    this.cargador = false;
    this.inicializarRangeCalendar();
    this.listarCelulas();
    this.mesActual();
  }
  ngOnInit(): void {}

  //#region  logica
  cambioEstadoCargador() {
    if (this.cargador === true) {
      this.cargador = false;
    } else {
      this.cargador = true;
    }
  }

  suscribirCelulasRedux() {
    this.store
      .select('celulas')
      .subscribe((celulas) => (this.listaCelulasResponse = celulas));
  }

  suscribirLoginRedux() {
    this.store
      .select('login')
      .subscribe((login) => (this.usuariorResponse = login));
  }

  suscribirEstadoCargadorGlobalRedux() {
    this.store
      .select('estadoCargador')
      .subscribe((resp) => (this.cargador = resp));
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

  inicializarRangeCalendar() {
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  cargarCelulasRedux(celulas: ListaCelulasResponse[]) {
    celulas.forEach((element: ListaCelulasResponse) => {
      this.store.dispatch(crearCelula(element));
    });
  }
  obtenerUsuSessionStorange(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }

  //#endregion
  //#region ServiciosRest
  listarCelulas() {
    this.store.dispatch(limpiarCelula());
    this.store.dispatch(estadoCargador({ estado: true }));
    this.listaCelulasRequest = {
      idUser: this.obtenerUsuSessionStorange().idUser,
    };
    this._celulaService
      .ConsultarEntidadListaModelo(this.listaCelulasRequest)
      .subscribe(
        (resp: Respuesta<ListaCelulasResponse>) => {
          this.listaCelulasResponse = resp.entity;
          this.listaCelulasResponse.map((dato) => {
            dato.posicion = this.posicionesArray++;
            dato.reporteSemana = 'Reportar';
            this.store.dispatch(estadoCargador({ estado: false }));
            return dato;
          });
          this.cargarCelulasRedux(this.listaCelulasResponse);
        },
        () => {
          this.store.dispatch(estadoCargador({ estado: false }));
          console.log('Error en la consulta del servicio!!!');
        }
      );
  }

  //#endregion
  //#region  MotodosDialog
  nuevaCelulaDialog() {
    const dialogRef = this.dialog.open(NuevaComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //#endregion
  //#region variables
  range: FormGroup;
  cargador: boolean;
  listaCelulasRequest: ListaCelulasRequest;
  listaCelulasResponse: ListaCelulasResponse[] = [];
  respuestaServicio: Respuesta<ListaCelulasResponse>;
  posicionesArray: number = 1;
  mesActualNombre: string;
  usuariorResponse: UsuariorResponse[] = [];
  filterBusqueda = '';
  //#endregion
}
