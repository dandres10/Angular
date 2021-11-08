// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { multiplicar, dividir } from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: [],
})
export class HijoComponent implements OnInit {
  constructor(private store:Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('contador').subscribe(contador => this.contador = contador);
  }

  multiplicar() {
    // this.contador *= 2;
    // this.cambioContador.emit(this.contador);
    this.store.dispatch(multiplicar({numero: 2}));
  }

  dividir() {
    // this.contador /= 2;
    // this.cambioContador.emit(this.contador);
    this.store.dispatch(dividir({numero: 2}))
  }

  resetNieto(nuevoContador){
      // this.contador = nuevoContador;
      // this.cambioContador.emit(this.contador);
  }



  contador: number;
  // @Input() contador: number;
  // @Output() cambioContador = new EventEmitter<number>();
}
