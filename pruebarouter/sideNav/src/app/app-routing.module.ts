import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavModule } from './components/sidenav/sidenav.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'sidenav', component: SidenavComponent, children:[
    {
      path: 'page-one',
      loadChildren: () =>
        import('./pages/page-one/page-one.module').then(
          m=>m.PageOneModule
        )
     },
     {
       path: 'page-two',
       loadChildren: () => 
         import('./pages/page-two/page-two.module').then(
           m=>m.PageTwoModule
         )
     },
     {
       path: 'page-three',
       loadChildren: () =>
         import('./pages/page-three/page-three.module').then(
           m=>m.PageThreeModule
         )
     }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),SidenavModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
