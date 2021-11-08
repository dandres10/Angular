import { createAction, props } from '@ngrx/store';


export  const estadoCargador = createAction('[Master] estado cargador', props<{estado:boolean}>())