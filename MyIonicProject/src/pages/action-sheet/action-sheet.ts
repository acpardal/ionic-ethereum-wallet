import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

@Component({
    selector: 'page-action-sheet',
    templateUrl: 'action-sheet.html'
  })
export class ActionSheetPage {

  constructor(public actionSheetCtrl: ActionSheetController) { }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
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
}