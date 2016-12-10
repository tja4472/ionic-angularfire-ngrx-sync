import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { combineReducers } from '@ngrx/store';

import * as fromTodo from './todo.reducer';
import * as fromAppFirebase from './app-firebase.reducer';

export interface State {
  // These property names have to match those in the compose.
  appFirebase: fromAppFirebase.State;
  todo: fromTodo.State;
}

const reducers = {
  appFirebase: fromAppFirebase.reducer,
  todo: fromTodo.reducer
};

const developmentReducer: ActionReducer<State> = compose(
  localStorageSync(['todo', 'appFirebase'], true),
  storeFreeze,
  storeLogger(),
  combineReducers)(reducers);
// const productionReducer: ActionReducer<State>  = combineReducers(reducers);

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
// appFirebase
export const getAppFirebaseState = (state: State) => state.appFirebase;

export const getAppFirebase_IsConnectedToFirebase = createSelector(getAppFirebaseState, fromAppFirebase.getIsConnectedToFirebase);
export const getAppFirebase_IsConnectingToFirebase = createSelector(getAppFirebaseState, fromAppFirebase.getIsConnectingToFirebase);
//
// todo
export const getTodoState = (state: State) => state.todo;

export const getTodo_Loaded = createSelector(getTodoState, fromTodo.getLoaded);
export const getTodo_Loading = createSelector(getTodoState, fromTodo.getLoading);
export const getTodo_Todos = createSelector(getTodoState, fromTodo.getTodos);
