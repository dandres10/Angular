import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuModule } from './componentes/menu/core/menu.module';
import { MenuComponent } from './componentes/menu/menu.component';
import { AuthGuard } from './servicios/ProteccionRutas/auth.guard';






const routes: Routes = [
  {
    path: 'login',
    
    loadChildren: () =>
      import('./paginas/login/core/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'menu',
    // canActivate: [AuthGuard],
    component: MenuComponent, children: [
      {
        path: 'celulas',
        // canActivate: [AuthGuard] ,
        loadChildren: () => 
          import('./paginas/celula/core/celula.module').then(m => m.CelulaModule) 
      },
      {
        path: 'reportesCelula',
        // canActivate: [AuthGuard] ,
        loadChildren: () => 
        import('./paginas/reportes/core/reportes.module').then(m => m.ReportesModule) 
      }
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'login'},
  { path: '',   redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MenuModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
