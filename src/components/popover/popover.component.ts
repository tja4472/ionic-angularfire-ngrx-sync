import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
    <!--
      <ion-list-header>Ionic</ion-list-header>
-->      
      <button ion-item (click)="close('ClearCompleted')">Clear completed</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(private viewCtrl: ViewController) {}

  close(data: string) {
    this.viewCtrl.dismiss(data);
  }
}
