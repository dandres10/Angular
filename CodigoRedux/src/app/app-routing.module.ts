import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tabla1Component } from './pages/tabla1/tabla1.component';
import { Tabla2Component } from './pages/tabla2/tabla2.component';

const routes: Routes = [
  { path: 'tabla1', component: Tabla1Component },
  { path: 'tabla2', component: Tabla2Component },
  { path: '**', pathMatch: 'full', redirectTo: 'tabla1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
