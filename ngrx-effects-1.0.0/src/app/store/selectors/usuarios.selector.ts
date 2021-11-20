import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as  Reducers  from '../reducers/index'



export const getUsuariosState = createFeatureSelector<Reducers.UsuariosState>('usuarios');


export const getLoaded = createSelector(
    getUsuariosState,
    (state: Reducers.UsuariosState) => state.loaded
)

export const getLoading = createSelector(
    getUsuariosState,
    (state: Reducers.UsuariosState) => state.loading
)

export const getUsers = createSelector(
    getUsuariosState,
    (state: Reducers.UsuariosState) => state.users
)