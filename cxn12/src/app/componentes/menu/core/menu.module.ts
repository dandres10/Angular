import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu.component';
import { MaterialModule } from '../../../transversal/diseno/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class MenuModule { }
