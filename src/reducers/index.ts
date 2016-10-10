import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { combineReducers } from '@ngrx/store';
//  error TS4023: Selector 
// tslint:disable-next-line:no-unused-variable
import { share, Selector } from '../utils/util';

import * as fromTodo from './todo.reducer';
import * as fromAppFirebase from './app-firebase.reducer';

//  error TS4023: Selector 
// tslint:disable-next-line:no-unused-variable
import { ToDo } from '../models/todo';

export interface State {
  // These property names have to match those in the compose.
  appFirebase: fromAppFirebase.State;
  todo: fromTodo.State;
}

const reducers = {
  appFirebase: fromAppFirebase.reducer,
  todo: fromTodo.reducer
};

const developmentReducer = compose(
  localStorageSync(['todo'], true),
  storeFreeze,
  storeLogger(),
  combineReducers)(reducers);
// const productionReducer = combineReducers(reducers);

/*
Don't know where PROD is set.

export function reducer(state: any, action: any) {
  if (PROD) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}
*/
export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

/***********
 * Selectors
 ***********/
export function getAppFirebaseState(state$: Observable<State>) {
  return state$.select(s => s.appFirebase);
}

export const getAppFirebase_IsConnectedToFirebase = share(compose(fromAppFirebase.getIsConnectedToFirebase, getAppFirebaseState));
export const getAppFirebase_IsConnectingToFirebase = share(compose(fromAppFirebase.getIsConnectingToFirebase, getAppFirebaseState));

export function getTodoState(state$: Observable<State>) {
  return state$.select(s => s.todo);
}

export const getTodo_Loaded = share(compose(fromTodo.getLoaded, getTodoState));
export const getTodo_Loading = share(compose(fromTodo.getLoading, getTodoState));
export const getTodo_Todos = share(compose(fromTodo.getTodos, getTodoState));
