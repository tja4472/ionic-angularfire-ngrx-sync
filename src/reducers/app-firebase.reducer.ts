import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppFirebaseActions, AppFirebaseActionTypes } from '../actions/app-firebase.action';

import { assign } from '../utils/assign';

export interface State {
    isConnectingToFirebase: boolean;
    isConnectedToFirebase: boolean;
    offlineActions: Action[];
};

const initialState: State = {
    isConnectingToFirebase: false,
    isConnectedToFirebase: false,
    offlineActions: []
};

export function reducer(
    state = initialState,
    action: AppFirebaseActions,
    ): State {

    switch (action.type) {
        default: {
            return state;
        }

        case AppFirebaseActionTypes.FIREBASE_CONNECT: {
            return assign(state, {
                isConnectingToFirebase: true
            });
        }

        case AppFirebaseActionTypes.FIREBASE_CONNECT_SUCCESS: {
            return assign(state, {

                isConnectingToFirebase: false,
                isConnectedToFirebase: true
            });
        }

        case AppFirebaseActionTypes.FIREBASE_DISCONNECT_SUCCESS: {
            return assign(state, {
                isConnectingToFirebase: false,
                isConnectedToFirebase: false

            });
        }

        case AppFirebaseActionTypes.FIREBASE_SYNC_SUCCESS: {
            return assign(state, {
                offlineActions: []
            });
        }

        case AppFirebaseActionTypes.CREATE_OFFLINE_ACTION: {
            let offlineAction: Action = action.payload;

            return assign(state, {
                offlineActions: [...state.offlineActions, offlineAction]
            });
        }
    }
}

export function getIsConnectedToFirebase(state$: Observable<State>) {
  return state$.select(s => s.isConnectedToFirebase);
}

export function getIsConnectingToFirebase(state$: Observable<State>) {
  return state$.select(s => s.isConnectingToFirebase);
}
