import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { OwnerListComponent } from './owner/owner-list/owner-list.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { OwnerDetailsComponent } from './owner/owner-details/owner-details.component';
import { OwnerCreateComponent } from './owner/owner-create/owner-create.component';
import { OwnerUpdateComponent } from './owner/owner-update/owner-update.component';
import { OwnerDeleteComponent } from './owner/owner-delete/owner-delete.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list', component: OwnerListComponent },
  { path: 'details/:id', component: OwnerDetailsComponent },
  { path: 'owner/create', component: OwnerCreateComponent },
  { path: 'owner/update/:id', component: OwnerUpdateComponent },
  { path: 'owner/delete/:id', component: OwnerDeleteComponent },
  { path: '404', component : NotFoundComponent},
  { path: '500', component: InternalServerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
