import { Action } from '@ngrx/store';

import * as appFirebaseAction from '../actions/app-firebase.action';

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
    action: appFirebaseAction.Actions,
    ): State {

    switch (action.type) {
        default: {
            return state;
        }

        case appFirebaseAction.ActionTypes.FIREBASE_CONNECT: {
            return assign(state, {
                isConnectingToFirebase: true
            });
        }

        case appFirebaseAction.ActionTypes.FIREBASE_CONNECT_SUCCESS: {
            return assign(state, {

                isConnectingToFirebase: false,
                isConnectedToFirebase: true
            });
        }

        case appFirebaseAction.ActionTypes.FIREBASE_DISCONNECT_SUCCESS: {
            return assign(state, {
                isConnectingToFirebase: false,
                isConnectedToFirebase: false

            });
        }

        case appFirebaseAction.ActionTypes.FIREBASE_SYNC_SUCCESS: {
            return assign(state, {
                offlineActions: []
            });
        }

        case appFirebaseAction.ActionTypes.CREATE_OFFLINE_ACTION: {
            let offlineAction: Action = action.payload;

            return assign(state, {
                offlineActions: [...state.offlineActions, offlineAction]
            });
        }
    }
}

export const getIsConnectedToFirebase = (state: State) => state.isConnectedToFirebase;
export const getIsConnectingToFirebase = (state: State) => state.isConnectingToFirebase;
