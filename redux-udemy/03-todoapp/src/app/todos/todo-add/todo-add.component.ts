import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { crear } from '../todo.actions';


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent {
  constructor(private store: Store<AppState>) {
    this.txtInpunt = new FormControl('', Validators.required);
  }

  agregar(){
    if (this.txtInpunt.invalid) {
      return;
    }

    this.store.dispatch(crear({texto: this.txtInpunt.value}));

    this.txtInpunt.reset();

  }

  txtInpunt: FormControl;
}
