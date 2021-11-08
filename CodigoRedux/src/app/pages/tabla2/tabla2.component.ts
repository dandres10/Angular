import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { Store } from '@ngrx/store';
import { AppState } from '../../Redux/reductores/app.reducer';

@Component({
  selector: 'app-tabla2',
  templateUrl: './tabla2.component.html',
  styleUrls: ['./tabla2.component.scss']
})
export class Tabla2Component implements OnInit {

  listPerson: Person[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.suscribirEstadoCargadorGlobalRedux();
  }

  suscribirEstadoCargadorGlobalRedux() {
    this.store.select('listPerson').subscribe(resp => this.listPerson = resp);
  }



}
