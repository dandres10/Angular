import { NgModule } from '@angular/core';
import { AuthGuard } from './servicios/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { PrecioComponent } from './componentes/precio/precio.component';
import { ProtegidaComponent } from './componentes/protegida/protegida.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'precios', component: PrecioComponent},
  {path: 'protegida', component: ProtegidaComponent , canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
