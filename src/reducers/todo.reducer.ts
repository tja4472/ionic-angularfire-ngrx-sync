// import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TodoActions, TodoActionTypes } from '../actions/todo.action';
import { ToDo } from '../models/todo';
import { assign } from '../utils/assign';
import { reorderArray } from 'ionic-angular';

export interface State {
    loaded: boolean;
    loading: boolean;
    todos: ToDo[];
    removedTodos: ToDo[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    removedTodos: [],
    todos: []
};

export function reducer (
    state = initialState,
    action: TodoActions,
    ): State {
    switch (action.type) {
        case TodoActionTypes.FIREBASE_LOAD: {
            return assign(state, {
                loading: true
            });
        }

        case TodoActionTypes.FIREBASE_LOAD_SUCCESS: {
            const items: ToDo[] = action.payload;

            return assign(state, {
                loaded: true,
                loading: false,
                removedTodos: [],
                todos: items.map(book => book)
            });
        }

        // http://bodiddlie.github.io/ng-2-toh-with-ngrx-suite/
        case TodoActionTypes.LOCAL_CREATE: {
            const item: ToDo = assign(action.payload, {});
//            item.$key = '##' + Math.random().toString();
           // item.$key = database().ref().push().key;

            item._isDirty = true;
            item._isCreated = true;

            return assign(state, {
                loading: false,
                loaded: true,
                todos: [...state.todos, item],
            });
        }

        case TodoActionTypes.LOCAL_REORDER_LIST: {
            const indexes = action.payload; // .indexes;
            const reorderedTodos = [...state.todos];
            reorderArray(reorderedTodos, indexes);

            let reindexedItems: ToDo[] = [];

            for (let i = 0; i < reorderedTodos.length; i++) {
                let item = assign(reorderedTodos[i], {});
                item.index = i;
                item._isDirty = true;
                item._isUpdated = true;
                reindexedItems.push(item);
            }

            return assign(state, {
                loading: false,
                loaded: true,
                todos: reindexedItems
            });
        }

        case TodoActionTypes.LOCAL_UPDATE: {
            const item: ToDo = action.payload;

            item._isDirty = true;

            if (item._isCreated) {
                item._isUpdated = false;
            } else {
                item._isUpdated = true;
            }

            let index = state.todos.findIndex(x => x.$key === item.$key);

            return assign(state, {
                loading: false,
                loaded: true,
                todos: [
                    ...state.todos.slice(0, index),
                    item,
                    ...state.todos.slice(index + 1)
                ]
            });
        }

        case TodoActionTypes.LOCAL_DELETE: {
            const key: string = action.payload;
            let index = state.todos.findIndex(x => x.$key === key);
            let item = assign(state.todos[index], {});

            item._isDirty = true;
            item._isRemoved = true;

            return assign(state, {
                loading: false,
                loaded: true,
                removedTodos: [...state.removedTodos, item],
                todos: state.todos.filter(x => x.$key !== key)
            });
            /*
                        return assign(state, {
                            loading: false,
                            loaded: true,
                            todos: state.todos.filter(x => x.$key !== key)
                        });
            */
        }
        /*
                case ToDoActions.LOCAL_SAVE: {
                    const item: ToDo = action.payload;
                    console.log('ToDoActions.SAVE', item);
        
                    if (item.$key === '') {
                        // new item.
                        item.$key = '##' + Math.random().toString();
        
                        return assign(state, {
                            loading: false,
                            loaded: true,
                            todos: [...state.todos, action.payload]
                        });
                    } else {
                        // updated item.
                        let index = state.todos.findIndex(x => x.$key === item.$key);
                        console.log('aaaa>', index);
                        return assign(state, {
                            loading: false,
                            loaded: true,
                            todos: [
                                ...state.todos.slice(0, index),
                                action.payload,
                                ...state.todos.slice(index + 1)
                            ]
                        });
                    }
                }
        */

        default: {
            return state;
        }
    }
}

// =========
// Selectors
// =========
export function getLoaded(state$: Observable<State>) {
  return state$.select(s => s.loaded);
}

export function getLoading(state$: Observable<State>) {
  return state$.select(s => s.loading);
}

export function getTodos(state$: Observable<State>) {
  return state$.select(s => s.todos);
}
