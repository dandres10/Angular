import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaLiderAnfitrionResponse } from '../../../../modelos/liderAnfitrion/response/listaLiderAnfitrionResponse';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaLiderAnfitrionResponse,
    private fb: FormBuilder
  ) {
    this.liderAnfitrionResponse = data;
    this.inicializarFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {}

  //#region  logica
  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      movil: ['', [Validators.required]],
      telefonoFijo: ['', [Validators.required]],
     barrio: [''],
      direccion: ['', [Validators.required]],
      localidad: ['']
    });
  }

  cargarDatosFormulario() {
    this.formulario.reset({
      nombres: this.liderAnfitrionResponse.name,
      apellidos: `${this.liderAnfitrionResponse.lastName} ${this.liderAnfitrionResponse.lastNameSecond}`,
      correo: this.liderAnfitrionResponse.email,
      movil: this.liderAnfitrionResponse.movil,
      telefonoFijo: this.liderAnfitrionResponse.phone,
      barrio: this.liderAnfitrionResponse.neighborhood,
      direccion: this.liderAnfitrionResponse.address,
    });
  }

  editarLiderAnfitrion() {
    if (this.formulario.valid) {
      this.dialogo.close(JSON.stringify(this.obtenerDatosEditadosFormulario()));
    } else {
      this.dialogo.close(JSON.stringify(this.data));
    }
  }

  obtenerDatosEditadosFormulario() {
    let apellidos: string[] = this.formulario
      .get('apellidos')
      .value.toString()
      .split(' ');

    let editarLiderAnfitrion: ListaLiderAnfitrionResponse = {
      ...this.liderAnfitrionResponse,
      name: this.formulario.get('nombres').value,
      lastName:
        apellidos[0] == null || apellidos[0] == undefined ? '' : apellidos[0],
      lastNameSecond:
        apellidos[1] == null || apellidos[1] == undefined ? '' : apellidos[1],
      movil: this.formulario.get('movil').value,
      phone: this.formulario.get('telefonoFijo').value,
      neighborhood: this.formulario.get('barrio').value,
      address: this.formulario.get('direccion').value,
    };

    return editarLiderAnfitrion;
  }

  //#endregion

  //#region variables
  liderAnfitrionResponse: ListaLiderAnfitrionResponse;
  formulario: FormGroup;
  //#endregion
}
