import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { CrearLiderAnfitrionComponent } from '../../liderCelula/crear-lider-anfitrion/crear-lider-anfitrion.component';
import {
  limpiarLiderAnfitrion,
  crearLiderAnfitrion,
} from '../../../../transversal/reductores/lideresAnfitrion/liderAnfitrion.actions';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
import { LiderAnfitrionService } from '../../../../servicios/liderAnfitrion/lider-anfitrion.service';
import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { ListaLiderAnfitrionResponse } from '../../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css'],
})
export class NuevaComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private _liderAnfitrionService: LiderAnfitrionService,

  ) {
    this.listarLideresAnfitriones();
  }

  ngOnInit(): void {}

  //#region logica
  cerrar() {
    this.store.dispatch(limpiarLiderAnfitrion());
  }
  obtenerUsuarioSessionStorange(): UsuariorResponse {
    return JSON.parse(sessionStorage.getItem('usu'));
  }
  cargarLiderAnfitrionRedux(celulas: ListaLiderAnfitrionResponse[]) {
    celulas.forEach((element: ListaLiderAnfitrionResponse) => {
      this.store.dispatch(crearLiderAnfitrion(element));
    });
  }
  //#endregion

  //#region servicios rest
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

        this.cargarLiderAnfitrionRedux(this.listaLiderAnfitrionRespuesta);
       
      });
  }
  //#endregion

  //#region  dialogs
  abrirDialogCrearLiderHost() {
    this.dialog.open(CrearLiderAnfitrionComponent);
  }
  //#endregion

  listaLiderRespuesta: Respuesta<ListaLiderAnfitrionResponse>;
  listaLiderAnfitrionRespuesta: ListaLiderAnfitrionResponse[] = [];
}
