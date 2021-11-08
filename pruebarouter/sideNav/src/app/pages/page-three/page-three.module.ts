import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageThreeRoutingModule } from './page-three-routing.module';
import { PageThreeComponent } from './page-three.component';


@NgModule({
  declarations: [PageThreeComponent],
  imports: [
    CommonModule,
    PageThreeRoutingModule
  ]
})
export class PageThreeModule { }
