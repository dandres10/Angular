import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import * as selectors from '../../store/selectors/index'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  loading$: Observable<boolean>;
  users$: Observable<Usuario[]>
  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {

   

    this.store.select(s => s.usuarios).subscribe( ({ users, loading, error }) => {
      this.usuarios = users;
      this.loading  = loading;
      this.error    = error;
    });


    this.store.dispatch( cargarUsuarios());

    // this.usuarioService.getUsers()
    //     .subscribe( users => {
    //       console.log(users);
    //       this.usuarios = users;
    //     });

    this.loading$ = this.store.pipe(select(selectors.getLoaded))
    this.users$ = this.store.pipe(select(selectors.getUsers))


  }

}
