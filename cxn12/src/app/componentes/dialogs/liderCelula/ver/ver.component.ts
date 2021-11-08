import { Component, OnInit, Inject } from '@angular/core';
import { ListaLiderAnfitrionResponse } from '../../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import {
  crearCelula,
  limpiarCelula,
} from '../../../../paginas/celula/reductor/celula.actions';
import { CelulaService } from '../../../../servicios/celula/celula.service';
import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
})
export class VerComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<VerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaLiderAnfitrionResponse,
    private store: Store<AppState>,
    private _celulaService: CelulaService
  ) {
    this.liderAnfitrionResponse = data;

    this.listarCelulas();
  }

  cargarCelulasRedux(celulas: ListaCelulasResponse[]) {
    celulas.forEach((element: ListaCelulasResponse) => {
      this.store.dispatch(crearCelula(element));
    });
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
          if (resp.result == true) {
            this.listaCelulasResponse = resp.entity;
            this.listaCelulasResponse.map((dato) => {
              dato.posicion = posicionesArray++;
              dato.reporteSemana = 'Reportar';

              return dato;
            });
            this.store.dispatch(limpiarCelula());
            this.cargarCelulasRedux(this.listaCelulasResponse);
            this.celulaListaNew = this.listaCelulasResponse.filter(
              (elemento) =>
                elemento.idHost === this.liderAnfitrionResponse.idHost
            );
            console.log('lista', this.listaCelulasResponse);
            console.log('lista nueva', this.celulaListaNew);
          }
            
          
        },
        () => {
          console.log('Error en la consulta del servicio!!!');
        }
      );
  }

  ngOnInit(): void {}

  //#region variables
  liderAnfitrionResponse: ListaLiderAnfitrionResponse;
  idHost: number;
  celulaLista: ListaCelulasResponse[];
  celulaListaNew: ListaCelulasResponse[];
  listaCelulasResponse: ListaCelulasResponse[] = [];
  //#endregion
}
