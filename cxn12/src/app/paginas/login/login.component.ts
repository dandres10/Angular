import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../modelos/login/usuario';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import { UsuarioRequest } from '../../modelos/login/request/usuarioRequest';
import { UsuariorResponse } from '../../modelos/login/response/usuarioResponse';
import { Respuesta } from '../../modelos/respuesta/respuesta';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { crearLogin } from '../../transversal/reductores/login/login.actions';
import { ThrowStmt } from '@angular/compiler';
import { estadoCargador } from 'src/app/transversal/reductores/master/master.reducer';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaComponent } from '../../componentes/dialogs/respuestas/respuesta/respuesta.component';
import { RespuestaDialogos } from '../../modelos/respuesta/respuestaDialogos';
import { TipoNotificacion } from '../../modelos/respuesta/tipoNotificacion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _loginService: LoginService,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.inicializarFormulario();
    this.suscribirLoginRedux();
    this.suscribirEstadoCargadorRedux();
  }

  //#region Logica de la pagina
  inicializarFormulario() {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  cargarLoginRedux(login: UsuariorResponse[]) {
    login.forEach((element: UsuariorResponse) => {
      this.store.dispatch(crearLogin(element));
    });
  }

  suscribirLoginRedux() {
    this.store
      .select('login')
      .subscribe((login) => (this.usuariorResponse = login));
  }

  suscribirEstadoCargadorRedux() {
    this.store
      .select('estadoCargador')
      .subscribe((resp) => (this.estadoCargadorGlobal = resp));
  }

  cargarSessionStorange(usuario: UsuariorResponse) {
    sessionStorage.setItem('usu', JSON.stringify(usuario));
  }

  dialogInformativo(datos: RespuestaDialogos) {
    this.dialog.open(RespuestaComponent, { data: datos });
  }

  iniciarSesion() {
    if (this.formulario.valid) {
      let usuarioRequest: UsuarioRequest = {
        user: this.formulario.get('correo').value,
        password: this.formulario.get('contrasena').value,
      };
      this.ConsultarLogin(usuarioRequest);
    } else {
      this.mensajeError = 'Datos no validos';
    }
  }

  limpiarFormulario() {
    this.formulario.reset({
      correo: this.formulario.get('correo').value,
      contrasena: this.formulario.get('contrasena').value,
    });
  }

  //#endregion
  //#region servicios rest
  ConsultarLogin(datos: UsuarioRequest) {
    // this.store.dispatch(estadoCargador({ estado: true }));
    // this._loginService.ConsultarEntidad(datos).subscribe(
    //   (resp: Respuesta<UsuariorResponse>) => {
    //     if (resp.result == true) {
    //       this.respuestaUsuario = resp;
    //       this.usuariorResponse = this.respuestaUsuario.entity;
    //       this.cargarSessionStorange(this.usuariorResponse[0]);
    //       this.cargarLoginRedux(this.usuariorResponse);
    //       this.store.dispatch(estadoCargador({ estado: false }));
    //       this.router.navigate(['menu'], { replaceUrl: true });
    //       this.limpiarFormulario();
    //     }else{
    //       this.dialogInformativo({
    //         mensaje: resp.message[0],
    //         tipoNotificacion: resp.notificationType,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.dialogInformativo({
    //       mensaje: 'Error en la consulta',
    //       tipoNotificacion: 2,
    //     });
    //     this.store.dispatch(estadoCargador({ estado: false }));
    //     console.log(error);
    //   }
    // );

    this.router.navigate(['menu'], { replaceUrl: true });
  }
  //#endregion
  //#region validaciones
  get correoNoValido() {
    if (this.formulario.get('correo').invalid) {
      this.mensajeErrorFormularioCorreo = 'correo no valido';
    }

    if (this.formulario.get('correo').touched) {
      this.mensajeErrorFormularioCorreo = 'Correo no valido';
    }

    return (
      this.formulario.get('correo').invalid &&
      this.formulario.get('correo').touched
    );
  }

  get contrasenaNoValida() {
    if (this.formulario.get('contrasena').invalid) {
      this.mensajeErrorFormularioContrasena = 'Contraseña no valida';
    }

    if (this.formulario.get('contrasena').touched) {
      this.mensajeErrorFormularioContrasena = 'Debe ingresar la contraseña';
    }

    return (
      this.formulario.get('contrasena').invalid &&
      this.formulario.get('contrasena').touched
    );
  }
  //#endregion

  //#region variables
  formulario: FormGroup;
  mensajeErrorFormularioCorreo: string = '';
  mensajeErrorFormularioContrasena: string = '';
  mensajeError: string = '';
  usuario: Usuario;
  respuestaUsuario: Respuesta<UsuariorResponse>;
  usuariorResponse: UsuariorResponse[] = [];
  estadoCargadorGlobal: boolean;
  //#endregion
}
