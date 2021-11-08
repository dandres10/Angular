import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CelulaRoutingModule } from './celula-routing.module';
import { CelulaComponent } from '../celula.component';
import { MaterialModule } from '../../../transversal/diseno/material/material.module';
import { Tablecelula1Component } from '../../../componentes/tables/celula/tablecelula1/tablecelula1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensajesComponent } from '../../../componentes/mensajes/mensajes.component';


@NgModule({
  declarations: [CelulaComponent,Tablecelula1Component,MensajesComponent],
  imports: [
    CommonModule,
    CelulaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CelulaModule { }
