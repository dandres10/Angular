import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';
import { CelulaService } from '../../../../servicios/celula/celula.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit {
  constructor(private _celulaService: CelulaService,public dialogo: MatDialogRef<ReporteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaCelulasResponse) {
      this.celula = data;
      this.inicializarRangeCalendar();
  }

  ngOnInit(): void {}

  //#region  logica
  inicializarRangeCalendar() {
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  enviarReporteGo() {
    // if (this.formulario.valid) {
    //   this.dialogo.close(JSON.stringify(this.obtenerDatosEditadosFormulario()));
    // } else {
    //   this.mensajeError = 'Datos no validos';
    // }
  }
  //#endregion

  //#region  serviciosREST

  //#endregion

  //#region  varibles
  range: FormGroup;
  celula: ListaCelulasResponse;

  //#endregion
}
