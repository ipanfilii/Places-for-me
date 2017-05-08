import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {

  constructor( public menuCtrl: MenuController, public navCtrl: NavController, public platform: Platform ) {
         this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
  }
  login() {
    this.navCtrl.push('Login');
  }

  guest() {
    // this.navCtrl.push(HelloIonicPage);
    this.navCtrl.setRoot('HomePage');
  }

  tutorial() {
    this.navCtrl.push('Tutorial');
  }
}
