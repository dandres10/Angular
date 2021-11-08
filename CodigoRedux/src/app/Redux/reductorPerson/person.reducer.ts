import { createReducer, on } from '@ngrx/store';
import { Person } from '../../models/person';
import { crearPerson, limpiarListPerson, editarPerson, eliminarPerson } from './person.actions';

export const estadoIncial: Person[] = [];

const _personReducer = createReducer(
  estadoIncial,
  
  on(crearPerson, (state, person) => [
    ...state,
    person
  ]),

  on(editarPerson, (state, person) => {
    return state.map((personObj) => {
      if (personObj.id === person.id) {
        return {
          ...(personObj = person),
        };
      } else {
        return personObj;
      }
    });
  }),

  on(eliminarPerson, (state, person) => {
    const newState = state.filter(items => items.id != person.id)
    return newState;
  }),

  on(limpiarListPerson, (state) => estadoIncial)
);

export function personReducer(state, action) {
  return _personReducer(state, action);
}