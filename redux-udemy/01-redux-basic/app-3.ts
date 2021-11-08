import { Reducer } from "./ngrx-fake/ngrx";
import { contadorReducer } from "./contador/contador.reducer";
import { Action } from "./ngrx-fake/ngrx";
import { incrementadorAction, multiplicarAction } from './contador/contador.actions';

class Store<T> {
  constructor(private reducer: Reducer<T>, private state: T) {}

  getState() {
    return this.state;
  }

  dispach(action: Action) {
    this.state = this.reducer(this.state, action);
  }
}

const store = new Store(contadorReducer, 10);

console.log(store.getState());

store.dispach(incrementadorAction);
store.dispach(incrementadorAction);

console.log(store.getState());

store.dispach(multiplicarAction);

console.log(store.getState());
