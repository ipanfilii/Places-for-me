import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
