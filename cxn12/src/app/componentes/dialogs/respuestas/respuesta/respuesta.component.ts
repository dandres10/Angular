import { Component, OnInit, Input, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RespuestaDialogos } from '../../../../modelos/respuesta/respuestaDialogos';
@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.css'],
})
export class RespuestaComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<RespuestaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: RespuestaDialogos
  ) {
    this.respuesta = data;
    
  }

  ngOnInit(): void {}

  respuesta: RespuestaDialogos;
}
