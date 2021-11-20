import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasComponent } from '../gas/gas.component';
import { WaterStateManagerComponent } from './water-state-manager.component';
import { IceComponent } from '../ice/ice.component';
import { PlasmaComponent } from '../plasma/plasma.component';
import { LiquidComponent } from '../liquid/liquid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WaterStateManagerComponent,
    GasComponent,
    IceComponent,
    PlasmaComponent,
    LiquidComponent
  ]
})
export class WaterStateManagerModule { }
