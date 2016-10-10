import { Action } from '@ngrx/store';
import { label } from '../utils/util';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

export const TodoActionTypes = {
    ITEM_CREATE: label('[Todo] Item Create'),
    ITEM_DELETE: label('[Todo] Item Delete'),
    ITEM_UPDATE: label('[Todo] Item Update'),
    ITEMS_REORDER: label('[Todo] Items reorder'),
    FIREBASE_CREATE: label('[Todo] Firebase Create'),
    FIREBASE_DELETE: label('[Todo] Firebase Delete'),
    FIREBASE_LOAD: label('[Todo] Firebase Load'),
    FIREBASE_LOAD_CANCEL: label('[Todo] Firebase Load Cancel'),
    FIREBASE_LOAD_SUCCESS: label('[Todo] Firebase Load Success'),
    FIREBASE_REORDER_LIST: label('[Todo] Firebase Reorder List'),
    FIREBASE_UPDATE: label('[Todo] Firebase Update'),
    LOCAL_CREATE: label('[Todo] Local Create'),
    LOCAL_DELETE: label('[Todo] Local Delete'),
    LOCAL_REORDER_LIST: label('[Todo] Local Reorder List'),
    LOCAL_UPDATE: label('[Todo] Local Update'),
}

export class ItemCreateAction implements Action {
    type = TodoActionTypes.ITEM_CREATE;

    constructor(public payload: ToDo) { }
}

export class ItemDeleteAction implements Action {
    type = TodoActionTypes.ITEM_DELETE;

    constructor(public payload: string) { } // itemKey
}

export class ItemUpdateAction implements Action {
    type = TodoActionTypes.ITEM_UPDATE;

    constructor(public payload: ToDo) { }
}

export class ItemsReorderAction implements Action {
    type = TodoActionTypes.ITEMS_REORDER;

    constructor(public payload: Indexes) { }
}

export class FirebaseCreateAction implements Action {
    type = TodoActionTypes.FIREBASE_CREATE;

    constructor(public payload: ToDo) { }
}

export class FirebaseDeleteAction implements Action {
    type = TodoActionTypes.FIREBASE_DELETE;

    constructor(public payload: string) { } // itemKey
}

export class FirebaseLoadAction implements Action {
    type = TodoActionTypes.FIREBASE_LOAD;

    constructor() { }
}

export class FirebaseLoadCancelAction implements Action {
    type = TodoActionTypes.FIREBASE_LOAD_CANCEL;

    constructor() { }
}

export class FirebaseLoadSuccessAction implements Action {
    type = TodoActionTypes.FIREBASE_LOAD_SUCCESS;

    constructor(public payload: ToDo[]) { }
}

export class FirebaseReorderListAction implements Action {
    type = TodoActionTypes.FIREBASE_REORDER_LIST;

    constructor(public payload: Indexes) { }
}

export class FirebaseUpdateAction implements Action {
    type = TodoActionTypes.FIREBASE_UPDATE;

    constructor(public payload: ToDo) { }
}

export class LocalCreateAction implements Action {
    type = TodoActionTypes.LOCAL_CREATE;

    constructor(public payload: ToDo) { }
}

export class LocalDeleteAction implements Action {
    type = TodoActionTypes.LOCAL_DELETE;

    constructor(public payload: string) { } // itemKey
}

export class LocalReorderListAction implements Action {
    type = TodoActionTypes.LOCAL_REORDER_LIST;

    constructor(public payload: Indexes) { }
}

export class LocalUpdateAction implements Action {
    type = TodoActionTypes.LOCAL_UPDATE;

    constructor(public payload: ToDo) { }
}

export type TodoActions =
    ItemCreateAction |
    ItemDeleteAction |
    ItemUpdateAction |
    ItemsReorderAction |
    FirebaseCreateAction |
    FirebaseDeleteAction |
    FirebaseLoadAction |
    FirebaseLoadCancelAction |
    FirebaseLoadSuccessAction |
    FirebaseReorderListAction |
    FirebaseUpdateAction |
    LocalCreateAction |
    LocalDeleteAction |
    LocalReorderListAction |
    LocalUpdateAction;
