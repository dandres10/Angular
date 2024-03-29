import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../Redux/reductores/app.reducer';
import { Person } from '../../models/person';
import { ContextService } from '../../services/context.service';
import { crearPerson, editarPerson, eliminarPerson, limpiarListPerson } from '../../Redux/reductorPerson/person.actions';
import { AnyEventObject, interpret, Interpreter } from 'xstate';
import { waterMachine } from '../../stateMachine/water-machine'
import { playerMachine } from '../../stateMachine/player-machine'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabla1',
  templateUrl: './tabla1.component.html',
  styleUrls: ['./tabla1.component.scss']
})
export class Tabla1Component implements OnInit {

  listPerson: Person[] = [];
  stateEdit: boolean = false;
  id: number;
  nombre: string;
  edad: number;
  promisePlayerMachine: Interpreter<unknown, any, AnyEventObject, { value: any; context: unknown; }>
  observable: Observable<null>

  constructor(private store: Store<AppState>,
    private _contextService: ContextService) {
  }

  ngOnInit(): void {
    this.getListPersonService()
    this.suscribirEstadoCargadorGlobalRedux()
    // this.waterMachine()
    this.playerMachine()
  }

  suscribirEstadoCargadorGlobalRedux() {
    this.store.select('listPerson').subscribe(resp => this.listPerson = resp);
  }

  getListPersonService() {
    this.listPerson = this._contextService.getListPerson();
    this.loadPersonRedux(this.listPerson);
  }

  listClean() {
    this.store.dispatch(limpiarListPerson());
  }

  loadPersonRedux(person: Person[]) {
    //#region  Solucion
    this.store.dispatch(limpiarListPerson());
    //#endregion
    person.forEach((element) => {
      this.store.dispatch(crearPerson(element));
    })
  }

  savePerson() {
    this.store.dispatch(crearPerson(this.mapperPersonGetData()));
    this.cleanInputs();
  }


  editarPerson() {
    this.stateEdit = false;
    this.store.dispatch(editarPerson(this.mapperPersonGetData()));
    this.cleanInputs();
  }

  mapperPersonGetData() {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad
    }
  }

  loadEdit(item: Person) {
    this.id = item.id;
    this.nombre = item.nombre;
    this.edad = item.edad;
    this.stateEdit = true;
  }

  cleanInputs() {
    this.id = null;
    this.nombre = null;
    this.edad = null;

  }

  cancelAction() {
    this.stateEdit = false;
    this.cleanInputs();
  }

  deletePerson(item: Person) {
    console.log(item)
    this.store.dispatch(eliminarPerson(item));
  }

  waterMachine = () => {
    const promiseService = interpret(waterMachine).onTransition((state) =>

      console.log(state.value)

    );

    promiseService.start()
    promiseService.send({ type: 'HEAT' });
    promiseService.send({ type: 'HEAT' });
    promiseService.send({ type: 'FREEZE' });
    promiseService.send({ type: 'FREEZE' });
    promiseService.send({ type: 'FREEZE' });
  }

  playerMachine = () => {
    this.promisePlayerMachine =
      interpret(playerMachine('stop')).onTransition((state) =>
        console.log(state.value)
      );

    this.promisePlayerMachine.start()
  }






}
