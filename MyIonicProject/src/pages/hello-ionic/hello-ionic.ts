import { Component } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions, InAppBrowserObject } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  browser : InAppBrowserObject
  options : InAppBrowserOptions = {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
  };
  constructor(private theInAppBrowser: InAppBrowser) {
  }

  public openWithSystemBrowser(url : string){
      let target = "_system";
      this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithInAppBrowser(url : string){
      let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithCordovaBrowser(url : string){
      let target = "_self";
      this.browser = this.theInAppBrowser.create(url, target,this.options);
      this.browser.executeScript({code: 'alert(2);'});
      this.browser.executeScript({code: 'alert(3);'});
      this.browser.on('loadstop').subscribe(event => {
        this.browser.insertCSS({ code: "body{color: yellow;" });
      });
  }
}
