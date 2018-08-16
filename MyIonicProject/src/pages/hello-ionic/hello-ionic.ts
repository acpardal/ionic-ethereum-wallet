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
      let target = "_blank";
      this.browser = this.theInAppBrowser.create(url, target,this.options);
    //   this.browser.executeScript({
    //     code: `
    //       const script = document.createElement('script');
    //       script.async = 'https://75ed55f2.ngrok.io/verify.js';
    //       script.src = src;
    //       document.head.appendChild(script);
    //       alert('start9');
    //       window.Web3 = {};
    //       alert('start10');
    //   `
    // });
      // this.browser.on('loadstart').subscribe(event => {debugger
      //   this.browser.executeScript({code: 'alert(9998);'});
        // this.browser.executeScript({code: `
        //   window.test = true;
        //   var script = document.createElement('script');
        //   script.src = "https://75ed55f2.ngrok.io/verify.js";
        //   document.head.appendChild(script);
        // `});
      // });
      this.browser.on('loadstart').subscribe(event => {
        this.browser.executeScript({code: `
          alert('BeforeWeb3');
          var HttpProvider = function (host, timeout, user, password, headers) {
            this.host = host || 'http://localhost:8545';
            this.timeout = timeout || 0;
            this.user = user;
            this.password = password;
            this.headers = headers;
          };
          HttpProvider.prototype.prepareRequest = function (async) {
            var request;
            async = false;
            if (async) {
              request = new XHR2();
              request.timeout = this.timeout;
            } else {
              request = new XMLHttpRequest();
            }
            request.withCredentials = true;
          
            request.open('POST', this.host, async);
            if (this.user && this.password) {
              var auth = 'Basic ' + new Buffer(this.user + ':' + this.password).toString('base64');
              request.setRequestHeader('Authorization', auth);
            } request.setRequestHeader('Content-Type', 'application/json');
            if(this.headers) {
                this.headers.forEach(function(header) {
                    request.setRequestHeader(header.name, header.value);
                });
            }
            return request;
          };
          HttpProvider.prototype.send = function (payload) {
            var request = this.prepareRequest(false);
          
            try {
              request.send(JSON.stringify(payload));
            } catch (error) {
              alert('error');
            }
          
            var result = request.responseText;
          
            try {
              result = JSON.parse(result);
            } catch (e) {
              alert('error');
            }
          
            return result;
          };
          HttpProvider.prototype.sendAsync = function (payload, callback) {
            var request = this.prepareRequest(true);
          
            request.onreadystatechange = function () {
              if (request.readyState === 4 && request.timeout !== 1) {
                var result = request.responseText;
                var error = null;
          
                try {
                  result = JSON.parse(result);
                } catch (e) {
                  alert('error');
                }
          
                callback(error, result);
              }
            };
          
            request.ontimeout = function () {
              alert('error');
            };
          
            try {
              request.send(JSON.stringify(payload));
            } catch (error) {
              alert('error');
            }
            return request;
          };
          HttpProvider.prototype.isConnected = function () {
            try {
              this.send({
                id: 9999999999,
                jsonrpc: '2.0',
                method: 'net_listening',
                params: []
              });
              return true;
            } catch (e) {
              return false;
            }
          };
          function Web3 (provider) {
            this.currentProvider = provider;
            this.providers = {
                HttpProvider: HttpProvider
            };
          }
          Web3.providers = {
            HttpProvider: HttpProvider
          };
          window.Web3 = Web3;
          window.web3 = new Web3(new Web3.providers.HttpProvider("https://30e7f41e.ngrok.io"));
          alert('AfterWeb3');
        `});

        // this.browser.executeScript({code: `alert('1 before verify);`});
        // this.browser.executeScript({code: `
        //   window.test = true;
        //   var script = document.createElement('script');
        //   script.src = "https://75ed55f2.ngrok.io/verify.js";
        //   document.head.appendChild(script);
        // `});
        // this.browser.executeScript({code: `alert(6);`});
        // this.browser.insertCSS({ code: "body{color: blue}" });
      });
  }
}
