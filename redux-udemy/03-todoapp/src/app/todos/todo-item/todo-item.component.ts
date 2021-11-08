import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInpuntFisico: ElementRef;
  chkCompletado: FormControl;
  txtInput: FormControl;
  editando: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(() => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInpuntFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    
    this.editando = false;
    if (this.txtInput.invalid) {return;}
    if (this.txtInput.value === this.todo.texto) {return;}
    this.store.dispatch(
      actions.editar({ id: this.todo.id, texto: this.txtInput.value })
    );
  }
}
