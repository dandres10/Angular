import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregaCelulaComponent } from '../agrega-celula/agrega-celula.component';
import { NuevaComponent } from '../nueva/nueva.component';
import { MaterialModule } from '../../../../transversal/diseno/material/material.module';
import { TableLideresCelulaComponent } from '../../../tables/liderCelula/table-lideres-celula/table-lideres-celula.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregaCelulaComponent,
    NuevaComponent,
    TableLideresCelulaComponent,
    
  ],
  imports: [CommonModule, MaterialModule,FormsModule,ReactiveFormsModule],
})
export class CelulaNuevaModule {}
