import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tabla1Component } from './pages/tabla1/tabla1.component';
import { Tabla2Component } from './pages/tabla2/tabla2.component';
import { MenuComponent } from './components/menu/menu.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducers } from './Redux/reductores/app.reducer';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Tabla1Component,
    Tabla2Component,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
