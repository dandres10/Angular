import { Component, OnInit, Inject } from '@angular/core';
import { MaestrasService } from '../../../../servicios/maestras/maestras.service';
import { ListaTypoDocumentoRequest } from '../../../../modelos/maestras/request/listaTypoDocumentoRequest';
import { listaTypoDocumentoResponse } from '../../../../modelos/maestras/response/listaTypoDocumentoResponse';
import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LiderAnfitrionService } from '../../../../servicios/liderAnfitrion/lider-anfitrion.service';
import { ConsultarLiderAnfitrionRequest } from '../../../../modelos/liderAnfitrion/request/consultarLiderAnfitrionRequest';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
import { consultarLiderAnfitrionResponse } from '../../../../modelos/liderAnfitrion/response/consultarLiderAnfitrionResponse';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaComponent } from '../../respuestas/respuesta/respuesta.component';

import { ListaLiderAnfitrionResponse } from '../../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';
import { RespuestaSinEntity } from '../../../../modelos/respuesta/respuestaSinEntity';
import {
  crearLiderAnfitrion,
  limpiarLiderAnfitrion,
} from '../../../../transversal/reductores/lideresAnfitrion/liderAnfitrion.actions';


@Component({
  selector: 'app-crear-lider-anfitrion',
  templateUrl: './crear-lider-anfitrion.component.html',
  styleUrls: ['./crear-lider-anfitrion.component.css'],
})
export class CrearLiderAnfitrionComponent implements OnInit {
  constructor(
    private _maestrasService: MaestrasService,
    private fb: FormBuilder,
    private _liderAnfitrionService: LiderAnfitrionService,
    private store: Store<AppState>,
    public dialog: MatDialog
    
  ) {
    this.obtenerlistaDocumentos();
    this.inicializarFormulario();
  }

  ngOnInit(): void {
   
  }

  //#region logica
  inicializarFormulario() {
    this.formulario = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
    });
  }

  

  obtenerUserLogeado(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }

  obtenerDatosFormulario() {
    let data: ConsultarLiderAnfitrionRequest = {
      documentType: parseInt(this.formulario.get('tipoDocumento').value),
      document: this.formulario.get('numeroDocumento').value,
      idUser: this.obtenerUserLogeado().idUser,
    };
    return data;
  }

  consultarLider() {
    if (this.formulario.valid) {
      this.consultarLiderAnfitrion();
    }
  }
  cargarLiderAnfitrionRedux(liderAnfitrion: ListaLiderAnfitrionResponse[]) {
    this.store.dispatch(limpiarLiderAnfitrion());
    console.log('datos a cargar en redux', liderAnfitrion);
    liderAnfitrion.forEach((element: ListaLiderAnfitrionResponse) => {
      this.store.dispatch(crearLiderAnfitrion(element));
    });
  }
  //#endregion

  //#region dialogs
  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, {data : datos});
    
  }
  //#endregion

  //#region serviciosRest

  

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

  CrearLiderAnfitrion() {
    this._liderAnfitrionService
      .GuardarEntidad({
        idUser: this.obtenerUserLogeado().idUser,
        ganarMCI: this.consultaLider[0].idGanarMCI,
      })
      .subscribe((data: RespuestaSinEntity) => {

        if (data.result == true) {
          this.dialogInformativo({mensaje: data.message[0], tipoNotificacion: data.notificationType });
          this.listarLideresAnfitriones();
        }else{
          this.dialogInformativo({mensaje: data.message[0], tipoNotificacion: data.notificationType });
        }
        
       
        this.estadoConsulta = false;
      }, () => {
        this.dialogInformativo({mensaje: 'Error en la consulta.', tipoNotificacion: 2 });
      });
  }

  listarLideresAnfitriones() {
    let posicion: number = 1;
    this._liderAnfitrionService
      .ConsultarEntidadListaModelo({ idUser: this.obtenerUserLogeado().idUser })
      .subscribe((resp: Respuesta<ListaLiderAnfitrionResponse>) => {
        this.listaLiderRespuesta = resp;
        this.listaLiderAnfitrionRespuesta = this.listaLiderRespuesta.entity;
        this.listaLiderAnfitrionRespuesta.map((dato) => {
          dato.posicion = posicion++;
        });
     
        this.cargarLiderAnfitrionRedux(this.listaLiderAnfitrionRespuesta.reverse());
      });
  }

  consultarLiderAnfitrion() {
    this._liderAnfitrionService
      .ConsultarEntidad(this.obtenerDatosFormulario())
      .subscribe(
        (resp: Respuesta<consultarLiderAnfitrionResponse>) => {
          this.respuestaConsultaLider = resp;
          if (resp.result == false) {
            this.estadoConsulta = false;
            this.dialogInformativo({mensaje: resp.message[0], tipoNotificacion: resp.notificationType });
            
          } else {
      
            this.estadoConsulta = true;
            this.consultaLider = resp.entity;
           
          }
        },
        () => {
          this.dialogInformativo({mensaje: 'Error en la consulta.', tipoNotificacion: 2});
        }
      );
  }
  //#endregion

  //#region  variables
  tipoDocumentos: listaTypoDocumentoResponse[];
  formulario: FormGroup;
  respuestaConsultaLider: Respuesta<consultarLiderAnfitrionResponse>;
  consultaLider: consultarLiderAnfitrionResponse[];
 respuestaLiderAnfitrion: RespuestaSinEntity;
  estadoConsulta: boolean = false;
  estadoBtnCrear: boolean = false;
  mensajes: string = '';
  listaLiderRespuesta: Respuesta<ListaLiderAnfitrionResponse>;
  listaLiderAnfitrionRespuesta: ListaLiderAnfitrionResponse[] = [];
  //#endregion
}
