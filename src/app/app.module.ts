import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home.page';
import { TodoPage } from '../pages/todo/todo.page';

import { ControlMessages } from '../components/control-messages/control-messages.component';
import { Error } from '../components/error/error.component';
import { PopoverPage } from '../components/popover/popover.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

import { AppFirebaseService } from '../services/app-firebase.service';
import { TodoDataService} from '../services/todo.data.service';
import { TodoService } from '../services/todo.service';
import { ValidationService } from '../services/validation.service';

import { AngularFire, AngularFireModule } from 'angularfire2';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducer } from '../reducers';

import { AppFirebaseEffects } from '../effects/app-firebase.effect';
import { ToDoEffects } from '../effects/todo.effect';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

firebase.initializeApp(MyFirebaseAppConfig.config);

@NgModule({
  declarations: [
    ControlMessages,
    Error,
    HomePage,
    PopoverPage,
    TodoListComponent,
    MyApp,
    Page1,
    Page2,
    TodoPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig.config),    
    StoreModule.provideStore(reducer),
    EffectsModule.run(AppFirebaseEffects),
    EffectsModule.run(ToDoEffects),    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    Page1,
    Page2,
    TodoPage
  ],
  providers: [
    AngularFire,
    AppFirebaseService,
    TodoDataService,
    TodoService,
    ValidationService
  ]
})
export class AppModule {}
