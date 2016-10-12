import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-unused-variable
import { Observable } from 'rxjs/Observable';

import { Effect, Actions } from '@ngrx/effects';
// tslint:disable-next-line:no-unused-variable 
import { Action, Store } from '@ngrx/store'

import * as FromRootReducer from '../reducers';
import * as AppFirebaseActions from '../actions/app-firebase.action';
import * as TodoActions from '../actions/todo.action';

// tslint:disable-next-line:no-unused-variable 
import { ToDo } from '../models/todo';
import { TodoDataService } from '../services/todo.data.service';

@Injectable()
export class ToDoEffects {
    constructor(
        private actions$: Actions,
        private state$: Store<FromRootReducer.State>,
        private todoDataService: TodoDataService,
        /*
            private appFirebaseActions: AppFirebaseActions,
            private updates$: StateUpdates<AppState>,
            private todoActions: TodoActions,
            private todoDataService: TodoDataService,
            private store: Store<AppState>
        */
    ) { }

    @Effect() offlineCreate$ = this.actions$
        .ofType(TodoActions.ActionTypes.LOCAL_CREATE)
        .map(action => {
            let firebaseAction = new TodoActions.FirebaseCreateAction(action.payload);
            return new AppFirebaseActions.CreateOfflineAction(firebaseAction);
        })

    @Effect() offlineDelete$ = this.actions$
        .ofType(TodoActions.ActionTypes.LOCAL_DELETE)
        .map(action => {
            let firebaseAction = new TodoActions.FirebaseDeleteAction(action.payload);
            return new AppFirebaseActions.CreateOfflineAction(firebaseAction);
        })

    @Effect() offlineUpdate$ = this.actions$
        .ofType(TodoActions.ActionTypes.LOCAL_UPDATE)
        .map(action => {
            let firebaseAction = new TodoActions.FirebaseUpdateAction(action.payload);
            return new AppFirebaseActions.CreateOfflineAction(firebaseAction);
        })

    // AppFirebaseActions - start
    @Effect() firebaseDisconnectSuccess$ = this.actions$
        .ofType(AppFirebaseActions.ActionTypes.FIREBASE_DISCONNECT_SUCCESS)
        .map(() => new TodoActions.FirebaseLoadCancelAction());

    @Effect() firebaseConnectSuccess$ = this.actions$
        .ofType(AppFirebaseActions.ActionTypes.FIREBASE_SYNC_SUCCESS)
        .map(() => new TodoActions.FirebaseLoadAction());
    // AppFirebaseActions - end

    @Effect() itemCreateFirebase$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEM_CREATE)
        .withLatestFrom(this.state$)
        .filter(([, state]) => state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemCreateAction) => action.payload)
        .map(payload => new TodoActions.FirebaseCreateAction(payload));

    @Effect() itemCreateLocal$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEM_CREATE)
        .withLatestFrom(this.state$)
        .filter(([, state]) => !state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemCreateAction) => action.payload)
        .map(payload => new TodoActions.LocalCreateAction(payload));

    @Effect() itemDeleteFirebase$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEM_DELETE)
        .withLatestFrom(this.state$)
        .filter(([, state]) => state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemDeleteAction) => action.payload)
        .map(payload => new TodoActions.FirebaseDeleteAction(payload));

    @Effect() itemDeleteLocal$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEM_DELETE)
        .withLatestFrom(this.state$)
        .filter(([, state]) => !state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemDeleteAction) => action.payload)
        .map(payload => new TodoActions.LocalDeleteAction(payload));

    @Effect() itemsReorderFirebase$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEMS_REORDER)
        .withLatestFrom(this.state$)
        .filter(([, state]) => state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemsReorderAction) => action.payload)
        .map(payload => new TodoActions.FirebaseReorderListAction(payload));

    @Effect() itemsReorderLocal$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEMS_REORDER)
        .withLatestFrom(this.state$)
        .filter(([, state]) => !state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemsReorderAction) => action.payload)
        .map(payload => new TodoActions.LocalReorderListAction(payload));

    @Effect() itemUpdateFirebase$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEM_UPDATE)
        .withLatestFrom(this.state$)
        .filter(([, state]) => state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemUpdateAction) => action.payload)
        .map(payload => new TodoActions.FirebaseUpdateAction(payload));

    @Effect() itemUpdateLocal$ = this.actions$
        .ofType(TodoActions.ActionTypes.ITEM_UPDATE)
        .withLatestFrom(this.state$)
        .filter(([, state]) => !state.appFirebase.isConnectedToFirebase)
        .map(([action]) => action)
        .map((action: TodoActions.ItemUpdateAction) => action.payload)
        .map(payload => new TodoActions.LocalUpdateAction(payload));

    @Effect() loadCollection$ = this.actions$
        .ofType(TodoActions.ActionTypes.FIREBASE_LOAD)
        .do(x => {
            console.log('Effect:loadCollection$:A', x);
        })
        // Watch database node and get items.
        .switchMap(x => this.todoDataService
            .getData()
            .takeUntil(this.actions$.ofType(TodoActions.ActionTypes.FIREBASE_LOAD_CANCEL)))
        .do(x => { console.log('Effect:loadCollection$:B', x); })
        .map((items: ToDo[]) => new TodoActions.FirebaseLoadSuccessAction(items));

    @Effect({ dispatch: false }) firebaseCreate$ = this.actions$
        .ofType(TodoActions.ActionTypes.FIREBASE_CREATE)
        .map((action: TodoActions.FirebaseCreateAction) => {
            this.todoDataService.create(action.payload);
        });

    @Effect({ dispatch: false }) firebaseRemove$ = this.actions$
        .ofType(TodoActions.ActionTypes.FIREBASE_DELETE)
        .map((action: TodoActions.FirebaseDeleteAction) => {
            this.todoDataService.removeItem(action.payload);
        });

    @Effect({ dispatch: false }) firebaseReorderList$ = this.actions$
        .ofType(TodoActions.ActionTypes.FIREBASE_REORDER_LIST)
        .withLatestFrom(this.state$)
        .map(([action, state]) => ({ action: <TodoActions.FirebaseReorderListAction>action, state }))
        .map(x => {
            this.todoDataService.reorderItemsAndUpdate(
                x.action.payload, x.state.todo.todos);
        });

    @Effect({ dispatch: false }) firebaseUpdate$ = this.actions$
        .ofType(TodoActions.ActionTypes.FIREBASE_UPDATE)
        .map((action: TodoActions.FirebaseUpdateAction) => {
            this.todoDataService.update(action.payload);
        });
}
