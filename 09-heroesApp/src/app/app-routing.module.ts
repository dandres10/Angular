import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './paginas/heroes/heroes.component';
import { HeroeComponent } from './paginas/heroe/heroe.component';

const routes: Routes = [
    {path: 'heroes', component: HeroesComponent},
    {path: 'heroe/:id', component: HeroeComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];


@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
