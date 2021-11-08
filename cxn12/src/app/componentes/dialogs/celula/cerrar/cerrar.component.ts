import { Component, OnInit, Inject } from '@angular/core';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CelulaService } from '../../../../servicios/celula/celula.service';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';
import { RespuestaComponent } from '../../respuestas/respuesta/respuesta.component';
import { RespuestaSinEntity } from '../../../../modelos/respuesta/respuestaSinEntity';
import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
import { AppState } from '../../../../app.reducer';
import { Store } from '@ngrx/store';
import {
  limpiarCelula,
  crearCelula,
} from '../../../../paginas/celula/reductor/celula.actions';

@Component({
  selector: 'app-cerrar',
  templateUrl: './cerrar.component.html',
  styleUrls: ['./cerrar.component.css'],
})
export class CerrarComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<CerrarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaCelulasResponse,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _celulaService: CelulaService,
    private store: Store<AppState>
  ) {
    this.celula = data;
    this.inicializarFormulario();
  }

  //#region logica
  inicializarFormulario() {
    this.formulario = this.fb.group({
      razon: ['', [Validators.required]],
    });
  }

  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, { data: datos });
  }

  reiniciarFormulario() {
    this.formulario.reset();
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
  }
  obtenerUsuSessionStorange(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }

  listarCelulas() {
    let posicionesArray: number = 1;
    this._celulaService
      .ConsultarEntidadListaModelo({
        idUser: this.obtenerUsuSessionStorange().idUser,
      })
      .subscribe(
        (resp: Respuesta<ListaCelulasResponse>) => {
          this.listaCelulasResponse = resp.entity;
          console.log(this.listaCelulasResponse);
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

  cargarCelulasRedux(celulas: ListaCelulasResponse[]) {
    celulas.forEach((element: ListaCelulasResponse) => {
      this.store.dispatch(crearCelula(element));
    });
  }
  //#endregion
  //#region serviciosRest
  cerrarGo() {
    if (this.formulario.valid) {
      this._celulaService
        .EliminarEntidad({
          idGo: this.celula.id,
          closingReason: this.formulario.get('razon').value,
        })
        .subscribe((resp: RespuestaSinEntity) => {
          this.repuestaCerrarGo = resp;
          if (resp.result == true) {
            this.reiniciarFormulario();
            this.listarCelulas();
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
        });
    } else {
      this.dialogInformativo({
        mensaje: 'Corregir los campos en rojo',
        tipoNotificacion: 2,
      });
    }
  }
  //#endregion

  ngOnInit(): void {}

  celula: ListaCelulasResponse;
  formulario: FormGroup;
  repuestaCerrarGo: RespuestaSinEntity;
  listaCelulasResponse: ListaCelulasResponse[] = [];
}
