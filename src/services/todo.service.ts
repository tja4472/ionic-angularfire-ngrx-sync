import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

import * as FromRootReducer from '../reducers';
import * as TodoActions from '../actions/todo.action';

// import { TodoSelector} from '../selectors';
import { database } from 'firebase';

@Injectable()
export class TodoService {
    constructor(
        private store: Store<FromRootReducer.State>
    ) { }

    getData(): Observable<ToDo[]> {
        return this.store.select(FromRootReducer.getTodo_Todos);
    }

    initialise(): void {
    }

    firebaseLoad() {
        this.store.dispatch(
            new TodoActions.FirebaseLoadAction());
    }

    isLoaded(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodo_Loaded);
    }

    isLoading(): Observable<boolean> {
        return this.store.select(FromRootReducer.getTodo_Loading);
    }

    reorderItems(indexes: Indexes) {
        this.store.dispatch(
            new TodoActions.ItemsReorderAction(indexes));
    }

    delete(todo: ToDo) {
        this.store.dispatch(
            new TodoActions.ItemDeleteAction(todo.$key));
    }

    save(todo: ToDo) {
        if (todo.$key === '') {
            todo.$key = database().ref().push().key;

            this.store.dispatch(
                new TodoActions.ItemCreateAction(todo));
        } else {
            this.store.dispatch(
                new TodoActions.ItemUpdateAction(todo));
        }
    }
}
