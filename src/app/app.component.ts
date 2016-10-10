import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home.page';

import { AppFirebaseService } from '../services/app-firebase.service';

import { database } from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    private appFirebaseService: AppFirebaseService,
    public platform: Platform,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Todos', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    console.log('#### initializeApp>');
    
    let connectedRef = database().ref('.info/connected');

    connectedRef.on('value', snap => {
      let isOnline: boolean = snap.val();

      console.log('isOnline>', isOnline, database().ref().push().key);

      if (isOnline) {
        this.appFirebaseService.connectToFirebase();
      } else {
        this.appFirebaseService.disconnectFromFirebase();
      }
    });

//-----         this.appFirebaseService.connectToFirebase();  
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
