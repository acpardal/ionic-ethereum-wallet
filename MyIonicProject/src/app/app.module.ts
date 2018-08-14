import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ActionSheetPage } from '../pages/action-sheet/action-sheet';
import { BasicAlertPage } from '../pages/basic-alert/basic-alert';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [MyApp,HelloIonicPage,ItemDetailsPage,ListPage,ActionSheetPage,BasicAlertPage],
  imports: [BrowserModule,IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp,HelloIonicPage,ItemDetailsPage,ListPage,ActionSheetPage,BasicAlertPage],
  providers: [InAppBrowser,StatusBar,SplashScreen,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
