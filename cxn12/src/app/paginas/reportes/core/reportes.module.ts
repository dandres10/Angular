import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from '../reportes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../transversal/diseno/material/material.module';
import { ReportesRoutingModule } from './reportes-routing.module';
import { TableReporteLiderComponent } from '../../../componentes/tables/reportes/celula/table-reporte-lider/table-reporte-lider.component';
import { TableReporteSeguimientoComponent } from '../../../componentes/tables/reportes/celula/table-reporte-seguimiento/table-reporte-seguimiento.component';
import { TableReporteEstadoCelulaComponent } from '../../../componentes/tables/reportes/celula/table-reporte-estado-celula/table-reporte-estado-celula.component';

@NgModule({
  declarations: [
    ReportesComponent,
    TableReporteLiderComponent,
    TableReporteSeguimientoComponent,
    TableReporteEstadoCelulaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReportesRoutingModule,
  ],
})
export class ReportesModule {}
