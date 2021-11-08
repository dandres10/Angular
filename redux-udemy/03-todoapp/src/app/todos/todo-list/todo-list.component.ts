import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private store: Store<AppState>) {
    this.store.select('todos').subscribe((todos) => (this.todos = todos));
  }

  todos: Todo[] = [];
}
