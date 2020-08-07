import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './paginas/template/template.component';
import { RactiveComponent } from './paginas/ractive/ractive.component';


const routes: Routes = [
  {path:'template', component: TemplateComponent},
  {path:'reactivo', component: RactiveComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'reactivo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
