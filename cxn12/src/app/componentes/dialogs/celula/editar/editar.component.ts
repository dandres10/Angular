import { Component, OnInit, Inject } from '@angular/core';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaCelulasResponse,
    private fb: FormBuilder
  ) {
    this.dialogDatos = data;
    this.inicializarFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {}

  //#region logica
  inicializarFormulario() {
    this.formulario = this.fb.group({
      dia: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      tipoGo: ['', [Validators.required]],
    });
  }

  obtenerHoraTime(dato: string) {
    let hora: string[] = [];
    hora = dato.split('T');
    return hora[hora.length - 1];
  }

  cargarDatosFormulario() {
    this.formulario.reset({
      dia: this.dialogDatos.day,
      hora: this.obtenerHoraTime(this.dialogDatos.hour),
      tipoGo: '1',
    });
  }

  editarGo() {
    if (this.formulario.valid) {
      this.dialogo.close(JSON.stringify(this.obtenerDatosEditadosFormulario()));
    } else {
      this.mensajeError = 'Datos no validos';
    }
  }

  obtenerDatosEditadosFormulario() {
    let editarCelula: ListaCelulasResponse = {
      ...this.dialogDatos,
      day: this.formulario.get('dia').value,
      hour: `${this.formulario.get('hora').value}:00`.substring(0, 8),
      typeGo: this.formulario.get('tipoGo').value,
    };

    return editarCelula;
  }

  //#endregion

  //#region validaciones
  get diaNoValido() {
    if (this.formulario.get('dia').invalid) {
      this.mensajeErrorFormularioDia = 'Dia no valido';
    }

    if (this.formulario.get('dia').touched) {
      this.mensajeErrorFormularioDia = 'El dia es requerido';
    }

    return (
      this.formulario.get('dia').invalid && this.formulario.get('dia').touched
    );
  }

  get horaNoValido() {
    if (this.formulario.get('hora').invalid) {
      this.mensajeErrorFormularioHora = 'Hora no valida';
    }

    if (this.formulario.get('hora').touched) {
      this.mensajeErrorFormularioHora = 'La hora es requerida';
    }

    return (
      this.formulario.get('hora').invalid && this.formulario.get('hora').touched
    );
  }

  get tipoGoNoValido() {
    if (this.formulario.get('tipoGo').invalid) {
      this.mensajeErrorFormularioTipoGo = 'Tipo Go no valida';
    }

    if (this.formulario.get('tipoGo').touched) {
      this.mensajeErrorFormularioTipoGo = 'Tipo Go es requerida';
    }

    return (
      this.formulario.get('tipoGo').invalid &&
      this.formulario.get('tipoGo').touched
    );
  }
  //#endregion

  //#region variables
  dialogDatos: ListaCelulasResponse;
  formulario: FormGroup;
  mensajeErrorFormularioTipoGo: string = '';
  mensajeErrorFormularioDia: string = '';
  mensajeErrorFormularioHora: string = '';
  mensajeError: string;

  //#endregion
}
