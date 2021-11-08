import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarComponent } from '../editar/editar.component';
import { VerComponent } from '../ver/ver.component';
import { MaterialModule } from '../../../../transversal/diseno/material/material.module';
import { TableLiderCelulasAcargoComponent } from '../../../tables/liderCelula/table-lider-celulas-acargo/table-lider-celulas-acargo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearLiderAnfitrionComponent } from '../crear-lider-anfitrion/crear-lider-anfitrion.component';



@NgModule({
  declarations: [EditarComponent,VerComponent,TableLiderCelulasAcargoComponent,CrearLiderAnfitrionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LiderCelulaModule { }
