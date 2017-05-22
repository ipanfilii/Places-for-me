import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, Platform, MenuController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
//import { SuperTabsController } from '../../ionic2-super-tabs/src';
import { SuperTabsController } from "ionic2-super-tabs/dist";
/**
 * Generated class for the RoomsManagement page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rooms-management',
  templateUrl: 'rooms-management.html',
})
export class RoomsManagement {

  statistics: any = 'Statistics';
  profile: any = 'Profile';
  addrooms: any = 'Addrooms';

 constructor(private network: Network, 
              private toastCtrl: ToastController,
              public platform: Platform,
              public menuCtrl: MenuController,
              private superTabsCtrl: SuperTabsController
             ) {
              this.platform.ready().then(() => {
                    this.menuCtrl.enable(true);
              });

  }

   /**
  * 
  * @param connectionState 
  */
  displayNetowrk(connectionState: string) {
    let networkType = this.network.type;
    if(networkType === 'none') {
        this.toastCtrl.create({
          message: 'You are now '+connectionState,
          duration:5000
        }).present();
  } else {
      this.toastCtrl.create({
          message: 'You are now '+connectionState+' via '+networkType,
          duration:5000
        }).present();
    }
  }

  /**
   * check if you have netowrk connection
   */
   ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      this.displayNetowrk(data.type);}
      , error => console.log(error));

    this.network.onDisconnect().subscribe(data => {
        this.displayNetowrk(data.type);}
      , error => console.log(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsManagement');
  }

}
