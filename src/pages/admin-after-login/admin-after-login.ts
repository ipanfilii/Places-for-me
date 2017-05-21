import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminAfterLogin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-after-login',
  templateUrl: 'admin-after-login.html',
})
export class AdminAfterLogin {
  public dataAdmin: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.dataAdmin)
      this.dataAdmin = navParams.get('admin');  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAfterLogin');
  }

  public addRooms() {

    this.navCtrl.push("Addrooms",{admin:this.dataAdmin});

  }

}
