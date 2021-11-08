import { Component, OnInit } from '@angular/core';
import { SeguimientoCelulaService } from '../../servicios/reportes/celulas/seguimiento-celula.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

import { SeguimientoCelulaResponse } from '../../modelos/reportes/celulas/response/seguimientoCelulaResponse';
import { Respuesta } from '../../modelos/respuesta/respuesta';
import { SeguimientoCelulaRequest } from '../../modelos/reportes/celulas/request/seguimientoCelulaRequest';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaComponent } from '../../componentes/dialogs/respuestas/respuesta/respuesta.component';
import { RespuestaDialogos } from '../../modelos/respuesta/respuestaDialogos';
import { LiderService } from '../../servicios/lider/lider.service';
import { ListaLideresResponse } from '../../modelos/lider/response/listaLideresResponse';
import { UsuariorResponse } from '../../modelos/login/response/usuarioResponse';
import { EstadoCelulaRequest } from '../../modelos/reportes/celulas/request/estadoCelulaRequest';
import { EstadoCelulaResponse } from '../../modelos/reportes/celulas/response/estadoCelulaResponse';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { crearReporteCelula, limpiarReporteCelula } from './reductor/reporteCelula.actions';
import { crearReporteSeguimientoCelula, limpiarReporteSeguimientoCelula } from './reductor/reporteSeguimiento.actions';
import { estadoCargador } from '../../transversal/reductores/master/master.reducer';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  constructor(
    private _seguimientoCelulaService: SeguimientoCelulaService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _liderService: LiderService,
    private store: Store<AppState>
  ) {
    // this.inicializarDateRangeFormulario();
    this.inicializarFormulario();
    this.reporteSeguimientoCelula();
    this.inicializarFormularioEstadiCelula();
    this.listarLideres();
    this.suscribirReporteEstadoCelulaRedux();
    this.suscribirReporteSeguimientoCelulaRedux();
    this.suscribirEstadoCargadorGlobalRedux();
  }

  ngOnInit(): void {}

  //#region  logica formularioEstadoCelula
  inicializarDateRangeFormulario() {
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }
  suscribirEstadoCargadorGlobalRedux() {
    this.store
      .select('estadoCargador')
      .subscribe((resp) => (this.cargador = resp));
  }

  suscribirReporteEstadoCelulaRedux(){
    this.store
    .select('reporteCelulaReducer')
    .subscribe((resp) => (this.listaEstadoCelula = resp));
  }

  suscribirReporteSeguimientoCelulaRedux(){
    this.store
    .select('reporteSeguimientoCelula')
    .subscribe((resp) => ( this.reporteSeguimiento = resp));
  }

  cargarReporteEstadoCelulasRedux(celulas: EstadoCelulaResponse[]) {
    celulas.forEach((element: EstadoCelulaResponse) => {
      this.store.dispatch(crearReporteCelula(element));
    });
  }

  cargarReporteSeguimientoCelulasRedux(celulas: SeguimientoCelulaResponse[]) {
    celulas.forEach((element: SeguimientoCelulaResponse) => {
      this.store.dispatch(crearReporteSeguimientoCelula(element));
    });
  }

 

  inicializarFormularioEstadiCelula() {
    this.formularioEstadoCelula = this.fb.group({
      lider: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  obtenerUsuarioSessionStorange(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }

  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, { data: datos });
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      estado: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      lider: ['', [Validators.required]]
    });
  }

  reporteEstadoCelulaBtn() {
    if (this.formularioEstadoCelula.valid) {
      let data: EstadoCelulaRequest = {
        IdLeader: parseInt(this.formularioEstadoCelula.get('lider').value),
        State:
          this.formularioEstadoCelula.get('estado').value == '1' ? true : false,
      };
      this.reporteEstadoCelula(data);
    }else{
      this.dialogInformativo({
        mensaje: 'Llene los campos en rojo',
        tipoNotificacion: 2,
      });
    }
  }

  buscarReporte() {
    let reporteSeguimiento: SeguimientoCelulaRequest;
    if (this.formulario.valid) {
      reporteSeguimiento = {
        initialDate: moment(this.formulario.get('start').value)
          .format()
          .substr(0, 10),
        finalDate: moment(this.formulario.get('end').value)
          .format()
          .substr(0, 10),
        state: this.formulario.get('estado').value == '1' ? true : false,
        idLeader: parseInt(this.formulario.get('lider').value)
      };
      this.reporteSeguimientoCelulaBusqueda(reporteSeguimiento);
      console.log('true', reporteSeguimiento);
    } else {
      console.log('false', reporteSeguimiento);
      return;
    }
  }
  //#endregion

  //#region  Servicios rest

  listarLideres() {
    this.store.dispatch(estadoCargador({estado: true}));
    this._liderService
      .ConsultarEntidadListaModelo({
        idUser: this.obtenerUsuarioSessionStorange().idUser,
      })
      .subscribe((resp: Respuesta<ListaLideresResponse>) => {
        this.listaLideresResponse = resp.entity;
        this.store.dispatch(estadoCargador({estado: false}));
      },()=> {
        this.store.dispatch(estadoCargador({estado: false}));
      });
  }
  reporteSeguimientoCelula() {
    this.store.dispatch(estadoCargador({estado: true}));
    this._seguimientoCelulaService
      .ReporteSeguimientoCelula({
        initialDate: this.fechaInicial,
        finalDate: this.fechaFinal,
        state: this.state,
        idLeader: this.obtenerUsuarioSessionStorange().idUser
      })
      .subscribe((resp: Respuesta<SeguimientoCelulaResponse>) => {
        if (resp.result == true) {
          this.reporteSeguimiento = resp.entity;
          this.cargarReporteSeguimientoCelulasRedux(resp.entity);
          this.store.dispatch(estadoCargador({estado: false}));
        }else{
          this.dialogInformativo({
            mensaje: resp.message[0],
            tipoNotificacion: resp.notificationType,
          });
          this.store.dispatch(estadoCargador({estado: false}));
        }
      },()=> {
        this.store.dispatch(estadoCargador({estado: false}));
      });
  }

  reporteEstadoCelula(data: EstadoCelulaRequest) {
    this.store.dispatch(estadoCargador({estado: true}));
    this._seguimientoCelulaService.ReportEstadoCelula(data).subscribe(
      (resp: Respuesta<EstadoCelulaResponse>) => {
        if (resp.result == true) {
          this.listaEstadoCelula = resp.entity;
          this.store.dispatch(limpiarReporteCelula());
          this.cargarReporteEstadoCelulasRedux(resp.entity);
          this.store.dispatch(estadoCargador({estado: false}));
        } else {
          this.dialogInformativo({
            mensaje: resp.message[0],
            tipoNotificacion: resp.notificationType,
          });
          this.store.dispatch(estadoCargador({estado: false}));
        }
      },
      () => {
        this.dialogInformativo({
          mensaje: 'Dato no encontrado.',
          tipoNotificacion: 2,
        });
        this.store.dispatch(estadoCargador({estado: false}));
      }
    );
  }

  reporteSeguimientoCelulaBusqueda(data: SeguimientoCelulaRequest) {
    this._seguimientoCelulaService.ReporteSeguimientoCelula(data).subscribe(
      (resp: Respuesta<SeguimientoCelulaResponse>) => {
        if (resp.result == true) {
          this.reporteSeguimiento = resp.entity;
          this.store.dispatch(limpiarReporteSeguimientoCelula());
          this.cargarReporteSeguimientoCelulasRedux(resp.entity);
        } else {
          this.dialogInformativo({
            mensaje: resp.message[0],
            tipoNotificacion: resp.notificationType,
          });
        }
      },
      () => {
        
        this.dialogInformativo({
          mensaje: 'Dato no encontrado.',
          tipoNotificacion: 2,
        });
      }
    );
  }
  //#endregion

  //#region variables
  form: FormGroup;
  range: FormGroup;
  fechaInicial: string = moment(new Date().toString()).format().substr(0, 10);
  fechaFinal: string = moment(new Date().toString()).format().substr(0, 10);
  reporteSeguimiento: SeguimientoCelulaResponse[] = [];
  state: boolean = null;
  week: number = 1;
  formulario: FormGroup;
  listaLideresResponse: ListaLideresResponse[] = [];
  listaEstadoCelula: EstadoCelulaResponse[] = [];
  formularioEstadoCelula: FormGroup;
  cargador: boolean;
  //#endregion
}
