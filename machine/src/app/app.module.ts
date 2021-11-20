import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { WaterStateManagerModule } from './pages/water-state-manager/water-state-manager.module';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    WaterStateManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
