import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterStateManagerComponent } from './pages/water-state-manager/water-state-manager.component';

const routes: Routes = [
  { path: 'water-state', component: WaterStateManagerComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'water-state' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
