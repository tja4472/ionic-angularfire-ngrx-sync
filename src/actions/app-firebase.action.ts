import { Action } from '@ngrx/store';
import { label } from '../utils/util';

export const AppFirebaseActionTypes = {
    CREATE_OFFLINE_ACTION: label('[AppFirebase] Create Offline Action'),
    FIREBASE_CONNECT: label('[AppFirebase] Firebase Connect'),
    FIREBASE_CONNECT_SUCCESS: label('[AppFirebase] Firebase Connect Success'),
    FIREBASE_DISCONNECT_SUCCESS: label('[AppFirebase] Firebase Disconnect Success'),
    FIREBASE_SYNC: label('[AppFirebase] Firebase Sync'),
    FIREBASE_SYNC_SUCCESS: label('[AppFirebase] Firebase Sync Success'),
}

export class CreateOfflineAction implements Action {
    type = AppFirebaseActionTypes.CREATE_OFFLINE_ACTION;

    constructor(public payload: Action) { }
}

export class FirebaseConnectAction implements Action {
    type = AppFirebaseActionTypes.FIREBASE_CONNECT;

    constructor() { }
}

export class FirebaseConnectSuccessAction implements Action {
    type = AppFirebaseActionTypes.FIREBASE_CONNECT_SUCCESS;

    constructor() { }
}

export class FirebaseDisconnectSuccessAction implements Action {
    type = AppFirebaseActionTypes.FIREBASE_DISCONNECT_SUCCESS;

    constructor() { }
}

export class FirebaseSyncAction implements Action {
    type = AppFirebaseActionTypes.FIREBASE_SYNC;

    constructor() { }
}

export class FirebaseSyncSuccessAction implements Action {
    type = AppFirebaseActionTypes.FIREBASE_SYNC_SUCCESS;

    constructor() { }
}

export type AppFirebaseActions =
    CreateOfflineAction |
    FirebaseConnectAction |
    FirebaseConnectSuccessAction |
    FirebaseDisconnectSuccessAction |
    FirebaseSyncAction |
    FirebaseSyncSuccessAction;
