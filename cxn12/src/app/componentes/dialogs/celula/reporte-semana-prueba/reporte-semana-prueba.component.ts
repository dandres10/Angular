//#region importaciones
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import {
  FormGroup,
  FormBuilder,
  Validators
 
} from '@angular/forms';
import { SemanasMes } from '../../../../transversal/modelos/semanasMes';
import { CelulaService } from '../../../../servicios/celula/celula.service';
import { ListaAsistentesCelulaResponse } from '../../../../modelos/celula/response/listaAsistentesCelulaResponse';
import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { GuardarAsistenteCelulaRequest } from '../../../../modelos/celula/request/guardarAsistenteCelulaRequest';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
import { EnviarReporteAsistenciaRequest } from '../../../../modelos/celula/request/enviarReporteAsistenciaRequest';
import { AsistenteReporte } from '../../../../modelos/celula/asistenteReporte';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';
import { RespuestaComponent } from '../../respuestas/respuesta/respuesta.component';
import { RespuestaSinEntity } from '../../../../modelos/respuesta/respuestaSinEntity';
import { MaestrasService } from '../../../../servicios/maestras/maestras.service';
import { ListaTypoDocumentoRequest } from '../../../../modelos/maestras/request/listaTypoDocumentoRequest';
import { listaTypoDocumentoResponse } from '../../../../modelos/maestras/response/listaTypoDocumentoResponse';
import { ListaTipoPersonaResponse } from '../../../../modelos/maestras/response/listaTipoPersonaResponse';
import { crearCelula, limpiarCelula } from '../../../../paginas/celula/reductor/celula.actions';
import { AppState } from '../../../../app.reducer';
import { Store } from '@ngrx/store';
//#endregion
@Component({
  selector: 'app-reporte-semana-prueba',
  templateUrl: './reporte-semana-prueba.component.html',
  styleUrls: ['./reporte-semana-prueba.component.css'],
})
export class ReporteSemanaPruebaComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ReporteSemanaPruebaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaCelulasResponse,
    private fb: FormBuilder,
    private _celulaService: CelulaService,
    public dialog: MatDialog,
    private _maestrasService: MaestrasService,
    private store: Store<AppState>
  ) {
    this.celula = data;

    this.listarAsistentesServicio();
    this.obtenerListaTipoPersona();
    this.inicializarFormulario();
    this.inicializarAgregarAsistente();
    this.semanasMes();
    this.condiciones = false;
    this.obtenerlistaDocumentos();
  }

  ngOnInit(): void {}

  //#region logica

  obtenerListaTipoPersona() {
    this._maestrasService
      .ConsultarEntidadListaTipoPersona({ country: 240, master: 25 })
      .subscribe((resp: Respuesta<ListaTipoPersonaResponse>) => {
        this.listaTipoPersona = resp.entity;
      });
  }

  obtenerlistaDocumentos() {
    let entidad: ListaTypoDocumentoRequest = {
      country: 48,
      master: 1,
    };
    this._maestrasService
      .ConsultarEntidad(entidad)
      .subscribe((resp: Respuesta<listaTypoDocumentoResponse>) => {
        this.tipoDocumentos = resp.entity;
      });
  }
  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, { data: datos });
  }
  inicializarFormulario() {
    this.formulario = this.fb.group({
      seRealizoGo: ['', [Validators.required]],
      numeroSemana: ['', [Validators.required]],
      temaGo: ['', [Validators.required]],
      numeroMes: ['', [Validators.required]],
      numeroAno: ['', [Validators.required]],
    });
  }

  inicializarAgregarAsistente() {
    this.agregarAsistente = this.fb.group({
      tipoDocumento: [''],
      numeroDocumento: [''],
      correo: ['', [Validators.required, Validators.email]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      tipoPersona: ['', [Validators.required]],
      edad: ['', [Validators.required]],
    });
  }

  aceptarTerminos(){
        if (this.condiciones == true) {
          this.condiciones = false;
        }else{
          this.condiciones = true;
        }
        
  }

  reiniciarFormularioAsistente() {
    this.agregarAsistente.reset();
    this.agregarAsistente.markAsPristine();
    this.agregarAsistente.markAsUntouched();
  }

  reiniciarFormularioEnviarReporte() {
    this.formulario.reset();
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
  }

  obtenerUsuarioLogin(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }

  obtenerDatosAgregarAsistente() {
    let agregar: GuardarAsistenteCelulaRequest = {
      idDocumentType: parseInt(
        this.agregarAsistente.get('tipoDocumento').value
      ),
      documentNumber:
        this.agregarAsistente.get('numeroDocumento').value == undefined ||
        this.agregarAsistente.get('numeroDocumento').value == null
          ? null
          : this.agregarAsistente.get('numeroDocumento').value,
      email: this.agregarAsistente.get('correo').value,
      name: this.agregarAsistente.get('nombres').value,
      lastName: this.agregarAsistente.get('apellidos').value,
      phone: this.agregarAsistente.get('telefono').value,
      go: this.celula.id,
      idUser: this.obtenerUsuarioLogin().idUser,
      idPersonType: parseInt(this.agregarAsistente.get('tipoPersona').value),
      edad:15
    };

    return agregar;
  }

  obtenerDatosFormularioReporte(): EnviarReporteAsistenciaRequest {
    let datos: EnviarReporteAsistenciaRequest = {
      done: this.formulario.get('seRealizoGo').value == '1' ? true : false,
      moth: parseInt(this.formulario.get('numeroMes').value),
      week: parseInt(this.formulario.get('numeroSemana').value),
      theme: this.formulario.get('temaGo').value,
      idGo: this.celula.id,
      listAssistant: this.tomarAsistencia(),
      year: parseInt(this.formulario.get('numeroAno').value),
    };

    return datos;
  }

  tomarAsistencia(): AsistenteReporte[] {
    let listaAsistencia: AsistenteReporte[] = [];
    this.listaAsistentesCelulaResponse.map(
      (elemento: ListaAsistentesCelulaResponse) => {
        if (elemento.estadoCheck == true) {
          listaAsistencia.push({ idMember: elemento.idMember });
        }
      }
    );

    return listaAsistencia;
  }

  semanasMes() {
    let fechaActual = new Date();

    var year = fechaActual.getFullYear();
    var mes = fechaActual.getMonth();
    var primerdia = (((new Date(year, mes, 1).getDay() - 1) % 7) + 7) % 7;
    var dias = new Date(year, mes + 1, 0).getDate() - 7 + primerdia;

    for (let i = 0; i < Math.ceil(dias / 7) + 1; i++) {
      let semanaMes: SemanasMes = {
        numeroSemana: i + 1,
        nombre: `Semana ${i + 1}`,
      };

      this.llenarComboSemanas.push(semanaMes);
    }
  }

  marcarAsistencia(dato: ListaAsistentesCelulaResponse) {
    this.listaAsistentesCelulaResponse.map((elemento) => {
      if (elemento.idMember == dato.idMember) {
        elemento.estadoCheck = !elemento.estadoCheck;
      }
    });
  }
  cargarCelulasRedux(celulas: ListaCelulasResponse[]) {
    celulas.forEach((element: ListaCelulasResponse) => {
      this.store.dispatch(crearCelula(element));
    });
  }

  enviarReporteGo() {
    if (this.formulario.valid) {
      this.enviarReporteCelula(this.obtenerDatosFormularioReporte());
    } else {
      this.dialogInformativo({
        mensaje: 'Debe llenar todos los campos en rojo.',
        tipoNotificacion: 2,
      });
      console.log('El formulario no es valido');
    }
  }
  obtenerUsuSessionStorange(): UsuariorResponse{
    return JSON.parse(sessionStorage.getItem('usu'));
}
  //#endregion
  //#region sesrviciosRest

  listarCelulas() {
    
    let posicionesArray: number = 1;
    this._celulaService
      .ConsultarEntidadListaModelo({idUser: this.obtenerUsuSessionStorange().idUser})
      .subscribe(
        (resp: Respuesta<ListaCelulasResponse>) => {
          this.listaCelulasResponse = resp.entity;
          this.listaCelulasResponse.map((dato) => {
            dato.posicion = posicionesArray++;
            dato.reporteSemana = 'Reportar';
          
          });
          this.store.dispatch(limpiarCelula());
          this.cargarCelulasRedux(this.listaCelulasResponse);
        
        },
        () => {
       
          console.log('Error en la consulta del servicio!!!');
        }
      );
  }

  enviarReporteCelula(data: EnviarReporteAsistenciaRequest) {
    this._celulaService.GuardarEntidadReporteCelula(data).subscribe(
      (resp: RespuestaSinEntity) => {
        if (resp.result == true) {
          this.reiniciarFormularioEnviarReporte();
          this.dialogInformativo({
            mensaje: resp.message[0],
            tipoNotificacion: 1,
          });
        } else {
          this.dialogInformativo({
            mensaje: resp.message[0],
            tipoNotificacion: 2,
          });
        }
      },
      () => {
        this.dialogInformativo({
          mensaje: 'Error en consulta al servidor',
          tipoNotificacion: 3,
        });
      }
    );
  }

  listarAsistentesServicio() {
    this._celulaService
      .ConsultarEntidadListaAsistentes({ id: this.celula.id })
      .subscribe((resp: Respuesta<ListaAsistentesCelulaResponse>) => {
        this.listaAsistentesCelulaResponse = resp.entity;
        this.listaAsistentesCelulaResponse.map(
          (elemento: ListaAsistentesCelulaResponse) => {
            elemento.estadoCheck = false;
          }
        );
      });
  }

  agregarAsistenteCelula() {
    if (this.agregarAsistente.valid) {
      this._celulaService
        .GuardarEntidadAsistenteCelula(this.obtenerDatosAgregarAsistente())
        .subscribe(
          (resp: RespuestaSinEntity) => {
            if (resp.result == true) {
              this.reiniciarFormularioAsistente();
              this.dialogInformativo({
                mensaje: resp.message[0],
                tipoNotificacion: 1,
              });
              this.listarCelulas();
              this.listarAsistentesServicio();
            } else {
              this.dialogInformativo({
                mensaje: resp.message[0],
                tipoNotificacion: 2,
              });
            }
          },
          () => {
            this.dialogInformativo({
              mensaje: 'Error en el servidor.',
              tipoNotificacion: 2,
            });
          }
        );
    } else {
      this.dialogInformativo({
        mensaje: 'Datos invalidos',
        tipoNotificacion: 2,
      });
    }
  }
  //#endregion
  //#region variables
  panelOpenState1: boolean;
  panelOpenState2: boolean;
  celula: ListaCelulasResponse;
  formulario: FormGroup;
  llenarComboSemanas: SemanasMes[] = [];
  listaAsistentesCelulaResponse: ListaAsistentesCelulaResponse[] = [];
  tipoDocumentos: listaTypoDocumentoResponse[];
  agregarAsistente: FormGroup;
  listaTipoPersona: ListaTipoPersonaResponse[];
  listaCelulasResponse: ListaCelulasResponse[] = [];
  condiciones: boolean;
  //#endregion
}
