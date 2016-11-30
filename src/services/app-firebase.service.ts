import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as FromRoot from '../reducers';
import * as AppFirebaseActions from '../actions/app-firebase.action';

import { AngularFire } from 'angularfire2';

@Injectable()
export class AppFirebaseService {
    constructor(
        private af: AngularFire,
        private store: Store<FromRoot.State>
    ) { }

    connectToFirebase() {
        this.store.dispatch(
            new AppFirebaseActions.FirebaseConnectAction());
    }

    connectToFirebaseSuccess() {
        this.store.dispatch(
            new AppFirebaseActions.FirebaseConnectSuccessAction());
    }

    disconnectFromFirebase() {
        this.store.dispatch(
            new AppFirebaseActions.FirebaseDisconnectSuccessAction());
    }

    isConnectedToFirebase(): Observable<boolean> {
        return this.store.select(FromRoot.getAppFirebase_IsConnectedToFirebase);
    }
}
