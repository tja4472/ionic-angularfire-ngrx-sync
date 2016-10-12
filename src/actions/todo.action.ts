import { Action } from '@ngrx/store';
import { type } from '../utils/util';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

export const ActionTypes = {
    ITEM_CREATE: type('[Todo] Item Create'),
    ITEM_DELETE: type('[Todo] Item Delete'),
    ITEM_UPDATE: type('[Todo] Item Update'),
    ITEMS_REORDER: type('[Todo] Items reorder'),
    FIREBASE_CREATE: type('[Todo] Firebase Create'),
    FIREBASE_DELETE: type('[Todo] Firebase Delete'),
    FIREBASE_LOAD: type('[Todo] Firebase Load'),
    FIREBASE_LOAD_CANCEL: type('[Todo] Firebase Load Cancel'),
    FIREBASE_LOAD_SUCCESS: type('[Todo] Firebase Load Success'),
    FIREBASE_REORDER_LIST: type('[Todo] Firebase Reorder List'),
    FIREBASE_UPDATE: type('[Todo] Firebase Update'),
    LOCAL_CREATE: type('[Todo] Local Create'),
    LOCAL_DELETE: type('[Todo] Local Delete'),
    LOCAL_REORDER_LIST: type('[Todo] Local Reorder List'),
    LOCAL_UPDATE: type('[Todo] Local Update'),
}

export class ItemCreateAction implements Action {
    type = ActionTypes.ITEM_CREATE;

    constructor(public payload: ToDo) { }
}

export class ItemDeleteAction implements Action {
    type = ActionTypes.ITEM_DELETE;

    constructor(public payload: string) { } // itemKey
}

export class ItemUpdateAction implements Action {
    type = ActionTypes.ITEM_UPDATE;

    constructor(public payload: ToDo) { }
}

export class ItemsReorderAction implements Action {
    type = ActionTypes.ITEMS_REORDER;

    constructor(public payload: Indexes) { }
}

export class FirebaseCreateAction implements Action {
    type = ActionTypes.FIREBASE_CREATE;

    constructor(public payload: ToDo) { }
}

export class FirebaseDeleteAction implements Action {
    type = ActionTypes.FIREBASE_DELETE;

    constructor(public payload: string) { } // itemKey
}

export class FirebaseLoadAction implements Action {
    type = ActionTypes.FIREBASE_LOAD;

    constructor() { }
}

export class FirebaseLoadCancelAction implements Action {
    type = ActionTypes.FIREBASE_LOAD_CANCEL;

    constructor() { }
}

export class FirebaseLoadSuccessAction implements Action {
    type = ActionTypes.FIREBASE_LOAD_SUCCESS;

    constructor(public payload: ToDo[]) { }
}

export class FirebaseReorderListAction implements Action {
    type = ActionTypes.FIREBASE_REORDER_LIST;

    constructor(public payload: Indexes) { }
}

export class FirebaseUpdateAction implements Action {
    type = ActionTypes.FIREBASE_UPDATE;

    constructor(public payload: ToDo) { }
}

export class LocalCreateAction implements Action {
    type = ActionTypes.LOCAL_CREATE;

    constructor(public payload: ToDo) { }
}

export class LocalDeleteAction implements Action {
    type = ActionTypes.LOCAL_DELETE;

    constructor(public payload: string) { } // itemKey
}

export class LocalReorderListAction implements Action {
    type = ActionTypes.LOCAL_REORDER_LIST;

    constructor(public payload: Indexes) { }
}

export class LocalUpdateAction implements Action {
    type = ActionTypes.LOCAL_UPDATE;

    constructor(public payload: ToDo) { }
}

export type Actions =
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
