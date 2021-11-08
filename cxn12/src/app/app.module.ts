import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './transversal/diseno/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReporteSemanaPruebaComponent } from './componentes/dialogs/celula/reporte-semana-prueba/reporte-semana-prueba.component';
import { EditarComponent } from './componentes/dialogs/celula/editar/editar.component';
import { VerComponent } from './componentes/dialogs/celula/ver/ver.component';
import { ReporteComponent } from './componentes/dialogs/celula/reporte/reporte.component';
import { TableCelulaReporteComponent } from './componentes/tables/celula/table-celula-reporte/table-celula-reporte.component';

import { LiderCelulaModule } from './componentes/dialogs/liderCelula/core/lider-celula.module';
import { CelulaNuevaModule } from './componentes/dialogs/celulaNueva/core/celula-nueva.module';
import { CelulaRutas } from './transversal/servicioRest/nombreRutas/celula/celula';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { appReducers } from './app.reducer';
import { LiderRutas } from './transversal/servicioRest/nombreRutas/lider/lider';
import { LoginRutas } from './transversal/servicioRest/nombreRutas/login/login';
import { LiderAnfitrionRutas } from './transversal/servicioRest/nombreRutas/liderAnfitrion/liderAnfitrion';
import { MaestrasRutas } from './transversal/servicioRest/nombreRutas/maestras/maestras';
import { RespuestaComponent } from './componentes/dialogs/respuestas/respuesta/respuesta.component';
import { CerrarComponent } from './componentes/dialogs/celula/cerrar/cerrar.component';

import { ReporteCelulas } from './transversal/servicioRest/nombreRutas/reportes/celulas/reporteCelulas';
import { FiltroBusquedaPipe } from './transversal/pipes/filtro-busqueda.pipe';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReporteSemanaPruebaComponent,
    EditarComponent,
    VerComponent,
    ReporteComponent,
    TableCelulaReporteComponent,
    RespuestaComponent,
    CerrarComponent,
    FiltroBusquedaPipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LiderCelulaModule,
    CelulaNuevaModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    //CelulaModule
  ],
  providers: [
    CelulaRutas,
    LiderRutas,
    LoginRutas,
    LiderAnfitrionRutas,
    MaestrasRutas,
    ReporteCelulas,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

