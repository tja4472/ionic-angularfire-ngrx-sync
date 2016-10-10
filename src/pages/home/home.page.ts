import { Component  } from '@angular/core';
import { ActionSheetController, NavController, ModalController, PopoverController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AppFirebaseService} from '../../services/app-firebase.service';
import { TodoService } from '../../services/todo.service';

import {
  EditItemOutput,
  RemoveItemOutput,
  ReorderItemsOutput,
  TodosInput } from '../../components/todo-list/todo-list.component';
// import { PopoverPage } from '../../components/popover/popover.component';
import { ToDo } from '../../models/todo';
import { TodoPage } from '../todo/todo.page';
// import { assign } from '../../utils';

@Component({
  templateUrl: 'home.page.html'
})
export class HomePage {
  todos$: Observable<TodosInput>;
  isConnectedToFirebase$: Observable<boolean>;

  constructor(


    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    private appFirebaseService: AppFirebaseService,
    private todoService: TodoService) {
    //
    this.todos$ = todoService.getData();
    this.isConnectedToFirebase$ = appFirebaseService.isConnectedToFirebase();
  }

  ionViewDidLoad() {
    this.todoService.initialise();
  }

  addItem() {
    let modal = this.modalCtrl.create(TodoPage);

    modal.onDidDismiss((data: ToDo) => {
      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }

  editItem(item: EditItemOutput) {
    let modal = this.modalCtrl.create(TodoPage, { todo: item });

    modal.onDidDismiss((data: ToDo) => {
      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }

  connectToFirebase() {
    this.appFirebaseService.connectToFirebase();
  }

  disconnectFromFirebase() {
    console.log('disconnectFromFirebase');
    this.appFirebaseService.disconnectFromFirebase();
  }

/*
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Clear completed?',
          handler: () => {
            console.log('Clear completed clicked');

          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);

    popover.onDidDismiss((data: string) => {
      if (data === 'ClearCompleted') {

      }
    });

    popover.present({
      ev: ev
    });
  }
*/
  reorderItems(indexes: ReorderItemsOutput) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }

  removeItem(item: RemoveItemOutput) {
    console.log('removeItem:item>', item);
    this.todoService.delete(item);
  }
}


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
class PopoverPage {
  constructor(private viewCtrl: ViewController) { }

  close(data: string) {
    this.viewCtrl.dismiss(data);
  }
}
