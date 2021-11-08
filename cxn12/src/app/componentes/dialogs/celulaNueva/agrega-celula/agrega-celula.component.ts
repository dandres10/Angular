import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LiderService } from '../../../../servicios/lider/lider.service';
import { ListaLideresResponse } from '../../../../modelos/lider/response/listaLideresResponse';

import { Respuesta } from '../../../../modelos/respuesta/respuesta';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { crearLider, limpiarLider } from '../../../../transversal/reductores/lideres/lider.actions';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ListaLiderAnfitrionResponse } from '../../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';
import { GuardarCelulaRequest } from '../../../../modelos/celula/request/guardarCelulaRequest';
import { CelulaService } from '../../../../servicios/celula/celula.service';
import { UsuariorResponse } from '../../../../modelos/login/response/usuarioResponse';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';
import { RespuestaComponent } from '../../respuestas/respuesta/respuesta.component';
import { MaestrasService } from '../../../../servicios/maestras/maestras.service';

import { ListaTipoCelulasResponse } from '../../../../modelos/maestras/response/listaTipoCelulasResponse';


@Component({
  selector: 'app-agrega-celula',
  templateUrl: './agrega-celula.component.html',
  styleUrls: ['./agrega-celula.component.css'],
})
export class AgregaCelulaComponent implements OnInit {
  constructor(public dialogo: MatDialogRef<AgregaCelulaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaLiderAnfitrionResponse,
    private _liderService: LiderService,
    private store: Store<AppState>,
    private _celulaService:CelulaService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _maestrasService:MaestrasService
    
  ) {
    this.liderAnfitrion = data;
 
    this.sucribirLideresRedux();
    this.store.dispatch(limpiarLider());
    this.listarLideres();
    this.inicializarFormulario();
    this.listaCelulas();
  }

  ngOnInit(): void {}

  //#region logica
  sucribirLideresRedux() {
    this.store
      .select('lideres')
      .subscribe((lideres) => (this.listaLideresResponse = lideres));
  }

  cargarLideresRedux(lideres: ListaLideresResponse[]) {
    lideres.forEach((element: ListaLideresResponse) => {
      this.store.dispatch(crearLider(element));
    });
  }

  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, {data : datos});
    
  }

  agregarCelula(){
    if (this.formulario.valid) {
      this.dialogo.close(JSON.stringify(this.obtenerDatosFormulario()));
    } else {
      this.mensajeError = 'Datos no validos';
    }
  }

  obtenerUsuarioSessionStorange(): UsuariorResponse{
     return JSON.parse(sessionStorage.getItem('usu'));
  }

  obtenerFechaActual(){
    let fecha = new Date();
    let mes = fecha.getMonth()+1 <10 ? `0${fecha.getMonth()+1}` : fecha.getMonth()+1;
    let dia = fecha.getDate() <10 ? `0${fecha.getDate()}` : fecha.getDate();
    return `${fecha.getUTCFullYear()}-${mes}-${dia}`
  }

  

  obtenerDatosFormulario() {
   
    let guardarCelula: GuardarCelulaRequest = {
      typeGo: parseInt(this.formulario.get('tipoGo').value),
      leader: parseInt(this.formulario.get('lider').value) ,
      host: this.liderAnfitrion.idHost,
      openingDate: this.formulario.get('fechaApertura').value,
      day: this.formulario.get('dia').value,
      hour: `${this.obtenerFechaActual()}T${this.formulario.get('hora').value}:00`,
      statu:  this.formulario.get('estado').value === "1"? true: false,
      creationUser: this.obtenerUsuarioSessionStorange().idUser,
      modificationUser: this.obtenerUsuarioSessionStorange().idUser,
      creationDate: this.obtenerFechaActual(),
      modificationDate: this.obtenerFechaActual(),
      reasonsClosing: ""
    };

    return guardarCelula;
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      fechaApertura: ['', [Validators.required]],
      tipoGo: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      lider: ['', [Validators.required]],
      dia: ['', [Validators.required]],
      estado:['', [Validators.required]]
    });
  }

 
      
  //#endregion

  //#region serviciosRest

  listaCelulas(){
    this._maestrasService.ConsultarEntidadListaTipoCelulas().subscribe((resp: Respuesta<ListaTipoCelulasResponse>)=> {
         this.listaTipoCelulasResponse = resp.entity;
         console.log(this.listaTipoCelulasResponse);
         this.listaTipoCelulasResponse.map((resp)=> {
            if (resp.ticeCodigo.toLowerCase() == 'go') {
              resp.textoInformativo = 'Son reuniones para evangelizar y orar por la nececidad de las personas.'
            }
            else {
              resp.textoInformativo = 'Es un grupo cerrado con el objetivo de disipular y formar líderes en la visión G12 .'
            }
         })


    })
  }

  listarLideres() {
   
    this._liderService
      .ConsultarEntidadListaModelo({idUser:this.obtenerUsuarioSessionStorange().idUser})
      .subscribe((resp: Respuesta<ListaLideresResponse>) => {
        
        this.listaLideresResponse = resp.entity;
       
        this.cargarLideresRedux(this.listaLideresResponse);

      });
  }

  //#endregion

  //#region variables
  listaLideresResponse: ListaLideresResponse[] = [];
  liderAnfitrion : ListaLiderAnfitrionResponse;
  celulaRequest:  GuardarCelulaRequest;
  formulario: FormGroup;
  mensajeError:  string;
  listaTipoCelulasResponse:ListaTipoCelulasResponse[];
  //#endregion
}
