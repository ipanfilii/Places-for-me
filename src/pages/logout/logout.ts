import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the Logout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class Logout {

  constructor(public nativeStorage: NativeStorage, public toastCtrl: ToastController, public navCtrl: NavController, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logout');
  }

  logout() {

    let loader = this.toastCtrl.create({
      message: 'Logout successfuly',
      duration: 1000,
      position: 'top'
    });
    loader.present();
    localStorage.removeItem('user');
    this.navCtrl.setRoot('Welcome')
  

  }

}
