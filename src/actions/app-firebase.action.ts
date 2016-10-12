import { Action } from '@ngrx/store';
import { type } from '../utils/util';

export const ActionTypes = {
    CREATE_OFFLINE_ACTION: type('[AppFirebase] Create Offline Action'),
    FIREBASE_CONNECT: type('[AppFirebase] Firebase Connect'),
    FIREBASE_CONNECT_SUCCESS: type('[AppFirebase] Firebase Connect Success'),
    FIREBASE_DISCONNECT_SUCCESS: type('[AppFirebase] Firebase Disconnect Success'),
    FIREBASE_SYNC: type('[AppFirebase] Firebase Sync'),
    FIREBASE_SYNC_SUCCESS: type('[AppFirebase] Firebase Sync Success'),
}

export class CreateOfflineAction implements Action {
    type = ActionTypes.CREATE_OFFLINE_ACTION;

    constructor(public payload: Action) { }
}

export class FirebaseConnectAction implements Action {
    type = ActionTypes.FIREBASE_CONNECT;

    constructor() { }
}

export class FirebaseConnectSuccessAction implements Action {
    type = ActionTypes.FIREBASE_CONNECT_SUCCESS;

    constructor() { }
}

export class FirebaseDisconnectSuccessAction implements Action {
    type = ActionTypes.FIREBASE_DISCONNECT_SUCCESS;

    constructor() { }
}

export class FirebaseSyncAction implements Action {
    type = ActionTypes.FIREBASE_SYNC;

    constructor() { }
}

export class FirebaseSyncSuccessAction implements Action {
    type = ActionTypes.FIREBASE_SYNC_SUCCESS;

    constructor() { }
}

export type Actions =
    CreateOfflineAction |
    FirebaseConnectAction |
    FirebaseConnectSuccessAction |
    FirebaseDisconnectSuccessAction |
    FirebaseSyncAction |
    FirebaseSyncSuccessAction;
