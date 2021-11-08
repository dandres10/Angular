import { Person } from '../../models/person';
import { ActionReducerMap } from '@ngrx/store';
import { personReducer } from '../reductorPerson/person.reducer';

export interface AppState {
  listPerson: Person[];
}


export const appReducers: ActionReducerMap<AppState> = {
  listPerson: personReducer
};
