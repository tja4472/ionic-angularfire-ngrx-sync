import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-unused-variable
import { Observable } from 'rxjs/Observable';

import { Effect, Actions } from '@ngrx/effects';
// tslint:disable-next-line:no-unused-variable 
import { Action, Store } from '@ngrx/store'

import * as FromRootReducer from '../reducers';
import * as AppFirebaseActions from '../actions/app-firebase.action';

// import { TextItem } from '../models';
import { AngularFire, } from 'angularfire2';

// import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AppFirebaseEffects {
    constructor(
        private actions$: Actions,
        private state$: Store<FromRootReducer.State>,
        public af: AngularFire
    ) { }

    @Effect() firebaseConnect$ = this.actions$
        .ofType(AppFirebaseActions.AppFirebaseActionTypes.FIREBASE_CONNECT)
        .do(x => {
            console.log('Effect:firebaseConnect$:A', x);
        })
        .map(() => new AppFirebaseActions.FirebaseConnectSuccessAction());

    @Effect() firebaseConnectSuccess$ = this.actions$
        .ofType(AppFirebaseActions.AppFirebaseActionTypes.FIREBASE_CONNECT_SUCCESS)
        .map(() => new AppFirebaseActions.FirebaseSyncAction());


    @Effect() firebaseSync$ = this.actions$
        .ofType(AppFirebaseActions.AppFirebaseActionTypes.FIREBASE_SYNC)
        .withLatestFrom(this.state$)
        .map(([, state]) => state.appFirebase.offlineActions)
        .mergeMap(offlineActions => {
            console.log('mergeMap>', offlineActions);
            let actions = [...offlineActions];
            // let actions = [];
            actions.push(new AppFirebaseActions.FirebaseSyncSuccessAction());
            return Observable.from(actions);
        });

    /*




        @Effect({ dispatch: false }) firebaseSync$ = this.actions$
            .ofType(AppFirebaseActions.AppFirebaseActionTypes.FIREBASE_SYNC)
            .withLatestFrom(this.state$)
            .map(([, state]) => state.appFirebase.offlineActions)
            .map(offlineActions => {
    
                return new AppFirebaseActions.FirebaseSyncSuccessAction();
            });
    */

    /*
        @Effect({ dispatch: false }) firebaseSyncAA$ = this.actions$
            .ofType(AppFirebaseActions.AppFirebaseActionTypes.FIREBASE_SYNC)
            .withLatestFrom(this.state$)
            .map(([,state]) => new AppFirebaseActions.FirebaseSyncSuccessAction());
    
    */
    /*
        @Effect({ dispatch: false }) firebaseSyncAA$ = this.actions$
            .ofType(AppFirebaseActions.AppFirebaseActionTypes.FIREBASE_SYNC)
            .withLatestFrom(this.state$)
            // tslint:disable-next-line:no-unused-variable       
            // .map(([action, state]) => state.appFirebase)
            .do(x => {
                console.log('aaaaaa>', x);
            });
    *                
                    let actions = [...offlineActions];
                    actions.push(new AppFirebaseActions.FirebaseSyncSuccessAction());
                    return actions;
    *                
    return new AppFirebaseActions.FirebaseSyncSuccessAction();
                });
    */


    //.switchMap(([action, state]) => (<State>state).appFirebase.offlineActions));



    /*
        @Effect() firebaseSync$ = this.updates$
            .whenAction(AppFirebaseActions.FIREBASE_SYNC)
            .map(x => x.state.appFirebase.offlineActions)
            .concatMap(offlineActions => {
                let actions = [...offlineActions];
                actions.push(this.appFirebaseActions.firebaseSyncSuccess());
                return actions;
            });
    */

}