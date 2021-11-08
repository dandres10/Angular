import { createAction, props } from '@ngrx/store';
import { Person } from '../../models/person';

export const crearPerson = createAction('[Person] Crea person', props<Person>());
export const editarPerson = createAction('[Person] Editar person', props<Person>());
export const limpiarListPerson = createAction('[Person] Limpiar lista person');
export const eliminarPerson = createAction('[Person] Elimina person', props<Person>()); 
