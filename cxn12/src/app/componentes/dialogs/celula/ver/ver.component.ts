import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
})
export class VerComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<VerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ListaCelulasResponse
  ) {
    this.dialogDatos = data;
  }

  ngOnInit(): void {}

  //#region variables
  dialogDatos: ListaCelulasResponse;
  //#endregion
}
