import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { ActionSheetPage } from '../action-sheet/action-sheet';
import { BasicAlertPage } from '../basic-alert/basic-alert';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string, page?: object}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.items.push({
      title: 'Action Sheet Page',
      note: 'This is Action Sheet Page',
      icon: this.icons[Math.floor(Math.random() * this.icons.length)],
      page: ActionSheetPage
    });
    this.items.push({
      title: 'Basic Alert Page',
      note: 'This is Basic Alert Page',
      icon: this.icons[Math.floor(Math.random() * this.icons.length)],
      page: BasicAlertPage
    });
  }

  itemTapped(event, item) {
    if(item.page) {
      this.navCtrl.push(item.page);
    } else {
      this.navCtrl.push(ItemDetailsPage, {
        item: item
      });
    }
  }
}
