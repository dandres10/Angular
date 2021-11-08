import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    
  }

  onSubmit(form: NgForm) {

    if (form.invalid ) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor',
      icon: 'question',
      
    });
      this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {
        console.log(resp);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email );
        }

    
        this.router.navigateByUrl('/home');
      },
      (error) => { 
        console.log(error.error.error.message);
        Swal.fire({
          text: error.error.error.message,
          title: 'Error al autenticar',
          icon: 'error',
          
        });
      });

  }


}
