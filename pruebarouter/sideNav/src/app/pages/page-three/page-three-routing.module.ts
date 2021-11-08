import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageThreeComponent } from './page-three.component';

const routes: Routes = [{path: '', component: PageThreeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageThreeRoutingModule { }
